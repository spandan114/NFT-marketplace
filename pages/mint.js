import React, { useState } from "react";
import { basicAuth } from "../helpers/AuthHelper";
import { create } from 'ipfs-http-client'
const client = create('https://ipfs.infura.io:5001/api/v0')


const mint = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [fileUrl, updateFileUrl] = useState(null)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(await uploadToIPFS(url))
      
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function uploadToIPFS(fileUrl) {
    // const { name, description, price } = formInput
    // if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name:"name", description:"description", image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  return (
    <div className="container create-nft">
      <div className="card m-5 p-4">
        <form>
          <div className="mb-3">
            <label htmlFor="nftName" className="form-label">
              NFT Name
            </label>
            <input type="text" className="form-control" id="nftName" />
          </div>
          <div className="mb-3">
            <label htmlFor="nftPrice" className="form-label">
              Bid Price
            </label>
            <input type="number" className="form-control" id="nftPrice" />
          </div>

          <input
        type="file"
        onChange={onChange}
      />

          <button type="submit" className="btn btn-outline-success btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default basicAuth(mint);
