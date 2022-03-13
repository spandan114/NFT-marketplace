//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./NFT.sol";
// [X] Create & List Nft
// [X] Buy NFT
// [X] Sell NFT
// [X] Cancel sell 

contract NFTMarket is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter private _itemId;
    
    address payable owner;
    uint256 public mintingCost = 0.0001 ether;

    constructor(){
        owner = payable(msg.sender);
    }

    enum ListingStatus {
      Active,
      Sold,
      Cancelled
    }

    struct _Item {
      ListingStatus status;
      address nftContract;
      address payable owner;
      address payable creator;
      uint256 token;
      uint256 price;
    }

    event Item (
      address nftContract,
      address owner,
      address creator,
      uint256 token,
      uint256 price
    );

    event CancelSell(
      uint256 token,
      address owner
	  );

    event Sold(
      address nftContract,
      address owner,
      address creator,
      uint256 token,
      uint256 price
	  );

    mapping(uint => _Item) public Items;

    function sellItem(string memory uri,uint256 _price,address _nftContract) payable public nonReentrant{
      require(_price > 0, "Price must be at least 1 wei");
      require(msg.value == mintingCost, "Price must be equal to listing price");

      _itemId.increment();
      uint256 itemId = _itemId.current();

      uint256 _tokenId = NFT(_nftContract).safeMint(uri,address(this),msg.sender);

      Items[itemId] =  _Item(
          ListingStatus.Active,
          _nftContract,
          payable(address(this)),
          payable(msg.sender),
          _tokenId,
          _price
      );

      IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

      emit Item(
        _nftContract,
        payable(address(this)),
        payable(msg.sender),
        _tokenId,
        _price
      );

    }

    function cancelSell(uint256 _tokenId) public {
       _Item storage listedItem = Items[_tokenId];
      require(msg.sender == listedItem.owner || msg.sender == listedItem.creator, "Only owner can cancel listing");
		  require(listedItem.status == ListingStatus.Active, "Listing is not active");

      listedItem.status = ListingStatus.Cancelled;
	   	IERC721(listedItem.nftContract).transferFrom(address(this), msg.sender, listedItem.token);

      emit CancelSell(listedItem.token,listedItem.owner);
    }

    function buyItem(uint256 _tokenId) payable public nonReentrant {
        _Item storage listedItem = Items[_tokenId];

        require(listedItem.price == msg.value, 'Price must be equal to NFT price');
        
        //Update the owner & status
        listedItem.owner = payable(msg.sender);
        listedItem.status = ListingStatus.Sold;

        //Pay owner of the NFT
        address payable ownerAddress = listedItem.creator;
        if(listedItem.owner == address(0)){
          ownerAddress = listedItem.owner;
        }
        ownerAddress.transfer(msg.value);
        //Tranfer NFT to the new owner

        IERC721(listedItem.nftContract).transferFrom(address(this), msg.sender, listedItem.token);

        payable(owner).transfer(mintingCost);

        emit Sold(
          listedItem.nftContract,
          msg.sender,
          listedItem.creator,
          listedItem.token,
          listedItem.price
        );

    }    

}