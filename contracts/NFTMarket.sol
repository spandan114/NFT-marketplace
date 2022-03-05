//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// [] Create & List Nft
// [] Buy NFT
// [] Sell NFT
// [] Create buy Order
// [] Cancel buy Order 

contract NFTMarket is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _itemId;
    
    address payable owner;
    uint256 public mintingCost = 0.001 ether;

    constructor(){
        owner = payable(msg.sender);
    }

    struct _Item {
      uint256 itemId;
      address payable seller;
      address payable owner;
      address token;
      uint256 price;
    }

    event Item (
      uint256 indexed itemId,
      address seller,
      address owner,
      address token,
      uint256 price
    );

    mapping(uint => _Item) public Items;

}