import * as types from "./types"

export const web3Loaded = (web3) =>{
    return{
        type:types.WEB3_LOADED,
        payload:web3
    }
}

export const walletAddressLoaded = (address) =>{
    return{
        type:types.WALLET_ADDRESS_LOADED,
        payload:address
    }
}

// NFT ACTIONS

export const nftContractLoaded = (contract) =>{
    return{
        type:types.NFT_CONTRACT_LOADED,
        payload:contract
    }
}

export const unsoldNFTLoaded = (nftList) =>{
    return{
        type:types.UNSOLD_NFT_LOADED,
        payload:nftList
    }
}

export const mintedNFTLoaded = (nftList) =>{
    return{
        type:types.MINTED_NFT_LOADED,
        payload:nftList
    }
}

export const ownedNFTLoaded = (nftList) =>{
    return{
        type:types.OWNED_NFT_LOADED,
        payload:nftList
    }
}

export const nftPurchased = (tokenId) =>{
    return{
        type:types.PURCHASED_SUCCESSFULLY,
        payload:tokenId
    }
}

// MARKETPLACE ACTIONS

export const nftMarketplaceContractLoaded = (contract) =>{
    return{
        type:types.NFT_MARKETPLACE_CONTRACT_LOADED,
        payload:contract
    }
}