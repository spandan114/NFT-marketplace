import { ethers } from "ethers";
import * as actions from "./actions"
import NFTMarketContract from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json"
import NFTContract from "../artifacts/contracts/NFT.sol/NFT.json"

var marketPlaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
var nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const weiToEther = (num) =>{
    return ethers.utils.formatEther(num)
}

 export const loadWeb3 = async(dispatch)=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch(actions.web3Loaded(provider))
    return provider;
  }
  
  export const loadContracts = async(provider,dispatch) =>{

    const nftMarketplaceContract = new ethers.Contract(marketPlaceAddress, NFTMarketContract.abi, provider);
    const nftContract = new ethers.Contract(nftAddress, NFTContract.abi, provider);

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