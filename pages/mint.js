import React from "react";
import { basicAuth } from "../helpers/AuthHelper";

const mint = () => {
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

          <button type="submit" className="btn btn-outline-success btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default basicAuth(mint);
