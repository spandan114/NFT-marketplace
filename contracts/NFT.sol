//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is  ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Exchange NFT", "EXNFT") {}

    function safeMint(string memory uri,address marketPlaceAddress,address creator) public payable returns(uint) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _mint(creator, tokenId);
        _setTokenURI(tokenId, uri);
        _setApprovalForAll(creator,marketPlaceAddress,true);
        return tokenId;
    }

}