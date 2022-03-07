const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Market", async function () {

  var owner;
  var address1; 
  var address2; 
  var marketplace;
  var nft;
  var marketplaceContract;
  var nftContract;

  //beforeEach will run before each test, re-deploying the contract every time.
  beforeEach(async function () {

    [owner, address1, address2,  ...address] = await ethers.getSigners();

    marketplace = await ethers.getContractFactory("NFTMarket");
    marketplaceContract = await marketplace.deploy();

    nft = await ethers.getContractFactory("NFT");  
    nftContract = await nft.deploy(marketplaceContract.address);

  })

   describe("Deployment Test", async function () {
      it(`NFT registered marketplace address must be equal to Marketplace address `,async function (){
        expect(await nftContract.marketPlaceContractAddress()).to.equal(marketplaceContract.address);
      })
      it(`NFT symbol must be EXNFT`,async function (){
        expect(await nftContract.symbol()).to.equal("EXNFT");
      })
      it(`NFT name must be equal to Exchange NFT`,async function (){
        expect(await nftContract.name()).to.equal("Exchange NFT");
      })
   })


});
