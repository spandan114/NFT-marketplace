import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../components/Card";
import { basicAuth } from "../helpers/AuthHelper";
import { loadMintedNFT } from "../redux/interactions";

const CreatorProfile = () => {

  const dispatch = useDispatch();

  const account = useSelector(state => state.web3Reducer.account);
  const nftContract = useSelector(state => state.nftReducer.contract);
  const marketplaceContract = useSelector(state => state.nftMarketplaceReducer.contract);
  const mintedNft = useSelector(state => state.nftMarketplaceReducer.mintedNFT);

  useEffect(() => {
    if(!mintedNft){
      console.log(mintedNft)
      loadMintedNFT(marketplaceContract,account,nftContract,dispatch)
    }
  }, [])
  

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-3">
          <CardComponent />
        </div>
        <div className="col-md-3">
          <CardComponent />
        </div>
        <div className="col-md-3">
          <CardComponent />
        </div>
        <div className="col-md-3">
          <CardComponent />
        </div>
      </div>
    </div>
  );
};

export default basicAuth(CreatorProfile);
