import { combineReducers } from "redux";
import * as types from './types'
const initialState = {};

  export const web3Reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case types.WEB3_LOADED:
        return {
          ...state,
          connection: action.payload,
        };
      case types.WALLET_ADDRESS_LOADED:
        return {
          ...state,
          account: action.payload,
        };
      default:
        return state;
    }
  };

  export const nftReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case types.NFT_CONTRACT_LOADED:
        return {
          ...state,
          contract: action.payload,
        };
      default:
        return state;
    }
  };

  export const nftMarketplaceReducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case types.NFT_MARKETPLACE_CONTRACT_LOADED:
        return {
          ...state,
          contract: action.payload,
        };
      default:
        return state;
    }
  };

  export default combineReducers({
    web3Reducer,
    nftReducer,
    nftMarketplaceReducer
  });