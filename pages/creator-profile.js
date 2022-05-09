import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../components/Card";
import Spinner from "../components/Spinner";
import { basicAuth } from "../helpers/AuthHelper";
import { loadMintedNFT } from "../redux/interactions";

const CreatorProfile = () => {

  const dispatch = useDispatch();

  const account = useSelector(state => state.web3Reducer.account);
  const nftContract = useSelector(state => state.nftReducer.contract);
  const marketplaceContract = useSelector(state => state.nftMarketplaceReducer.contract);
  const mintedNft = useSelector(state => state.nftMarketplaceReducer.mintedNFT);
  const provider = useSelector(state => state.web3Reducer.connection);

  useEffect(() => {
    if(provider){
      loadMintedNFT(provider,marketplaceContract,account,nftContract,dispatch)
    }
  }, [provider])
  
  return (
    <div className="container">
      {mintedNft ? (
        <div className="row mt-4">
          {
            mintedNft.length > 0?
            mintedNft.map((data,i)=>(
              <div className="col-md-3" key={i}>
              <CardComponent  nftData={data} />
            </div>
            ))
            // eslint-disable-next-line react/no-unescaped-entities
            :<h4 className="text-center">You din't mint any NFT yet</h4>
          }

        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default basicAuth(CreatorProfile);
