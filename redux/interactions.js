import { ethers } from "ethers";
import * as actions from "./actions"
import NFTMarketContract from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json"
import NFTContract from "../artifacts/contracts/NFT.sol/NFT.json"
import axios from "axios";

var marketPlaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
var nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

export const formatNFTData = async(data,nftContract) =>{
  const tokenUri = await nftContract.tokenURI(data.token)
  const meta = await axios.get(tokenUri)

  const formattedData = {
    name:meta.data.name,
    image:meta.data.image,
    desc:meta.data.description,
    price:weiToEther(data.price),
    token:(data.token).toString(),
    creator:data.creator,
    attributes:meta.data.attributes
  }

  return formattedData;

}

export const weiToEther = (num) =>{
    return ethers.utils.formatEther(num)
}

export const etherToWei = (n) => {
  const weiBigNumber = ethers.utils.parseEther(n.toString());
  const wei = weiBigNumber.toString();
  return wei
}

 export const loadWeb3 = async(dispatch)=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch(actions.web3Loaded(provider))
    return provider;
  }
  
  export const loadContracts = async(provider,dispatch) =>{
    const signer = provider.getSigner();
    const nftMarketplaceContract = new ethers.Contract(marketPlaceAddress, NFTMarketContract.abi, signer);
    const nftContract = new ethers.Contract(nftAddress, NFTContract.abi, signer);

    dispatch(actions.nftMarketplaceContractLoaded(nftMarketplaceContract))
    dispatch(actions.nftContractLoaded(nftContract))
    
    return {
        marketplace:nftMarketplaceContract,
        nft:nftContract
    }

  }

  export const loadAccount = async(provider,dispatch) =>{
    const signer = provider.getSigner();
    const connectedWallet = await signer.getAddress();
    dispatch(actions.walletAddressLoaded(connectedWallet))
    
  }

  export const loadUnsoldNFT = async(marketplaceContract,nftContract,dispatch)=>{
    var unsoldNft = await marketplaceContract.fetchMarketItems()

    const formattedNFTList = await Promise.all(unsoldNft.map(nft=>{
      var res = formatNFTData(nft,nftContract)
      return res;
    }))

    dispatch(actions.unsoldNFTLoaded(formattedNFTList))
  }

  export const loadMintedNFT = async(marketplaceContract,account,nftContract,dispatch)=>{
    var unsoldNft = await marketplaceContract.fetchCreatorItemsListed({from:account})
    
    const formattedNFTList = await Promise.all(unsoldNft.map(nft=>{
      var res = formatNFTData(nft,nftContract)
      return res;
    }))

    dispatch(actions.mintedNFTLoaded(formattedNFTList))
  }

  export const loadOwnedNFT = async(marketplaceContract,account,nftContract,dispatch)=>{
    var unsoldNft = await marketplaceContract.fetchOwnerItemsListed({from:account})
    
    const formattedNFTList = await Promise.all(unsoldNft.map(nft=>{
      var res = formatNFTData(nft,nftContract)
      return res;
    }))

    dispatch(actions.ownedNFTLoaded(formattedNFTList))
  }


  export const buyNFT = async(marketplaceContract,account,tokenId,price,dispatch,onSuccess,onError) =>{
    try {
      var res = await marketplaceContract.buyItem(tokenId,{value:etherToWei(price),from:account})
      const receipt = await res.wait();
      onSuccess()
      dispatch(actions.nftPurchased(tokenId))
      console.log(receipt)
    } catch (error) {
      onError(error.message)
    }
  }