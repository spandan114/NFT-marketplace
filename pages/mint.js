import React, { useState } from "react";
import { basicAuth } from "../helpers/AuthHelper";
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

const Mint = () => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const addAttribute = (e) => {
    e.preventDefault();
    if (attributes) {
      var attr = [
        ...attributes,
        {
          id: attributes.length,
          trait_type: e.target.key.value,
          value: e.target.value.value,
        },
      ];
      setAttributes(attr);
      console.log(attr);
    } else {
      setAttributes([
        { id: 0, trait_type: e.target.key.value, value: e.target.value.value },
      ]);
    }
  };

  const removeAttribute = (id) => {
    var filteredAttr = attributes.filter((data) => data.id !== id);
    setAttributes(filteredAttr);
  };

  async function uploadImageToIPFS(e) {
    e.preventDefault();

    console.log(file);
    // try {
    //   const added = await client.add(file)
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //   await uploadMetadataToIPFS(url)
    // } catch (error) {
    //   console.log('Error uploading file: ', error)
    // }
  }

  async function uploadMetadataToIPFS(name, description, attributes, fileUrl) {
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name: name,
      description: description,
      attributes: attributes,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <div className="container create-nft">
      <div className="card m-5 p-4">
        <div className="mb-3">
          <label htmlFor="nftName" className="form-label">
            NFT Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nftName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nftPrice" className="form-label">
            Bid Price
          </label>
          <input
            type="number"
            className="form-control"
            id="nftPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="NFTimage" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control-file"
            id="NFTimage"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <form onSubmit={(e) => addAttribute(e)}>
          <div className="mb-3">
            <label htmlFor="attributes" className="form-label">
              Attributes
            </label>

            {
  attributes?
  attributes.map((attr,i)=>(
     <p key={i}>{attr.trait_type}</p>
  ))
  :""
}

            <div className="d-flex attribute">
              <input
                type="text"
                name="key"
                className="form-control m-1"
                placeholder="Key"
              />
              <input
                type="text"
                name="value"
                className="form-control m-1"
                placeholder="Value"
              />
              <button type="submit" className="btn btn-primary mb-2 btn-sm">
                Add
              </button>
            </div>
          </div>
        </form>
        <button type="submit" className="btn btn-success btn-block">
          Mint NFT
        </button>
      </div>
    </div>
  );
};

export default basicAuth(Mint);
