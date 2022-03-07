const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Market", async function () {

  var address1; 
  var address2; 
  var marketplace;
  var nft;
  var marketplaceContract;
  var nftContract;

  var auctionPrice = ethers.utils.parseUnits('10','ether')
  var mintingCost = ethers.utils.parseUnits('0.0001','ether')

  //beforeEach will run before each test, re-deploying the contract every time.
  beforeEach(async function () {

    [address1, address2,  ...address] = await ethers.getSigners();

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

   describe("Mint & List NFT", async function () {
      it(`Mint NFT `,async function (){
        await nftContract.connect(address1).safeMint("www.myNFT.com")
        expect(await nftContract.tokenURI(1)).to.equal("www.myNFT.com");
        expect(await nftContract.ownerOf(1)).to.equal(address1.address);
        expect(await nftContract.balanceOf(address1.address)).to.equal(1);

      })

      it(`List NFT in marketplace`,async function (){
        await nftContract.connect(address1).safeMint("www.myNFT.com")
        const listedNft = await marketplaceContract.connect(address1).sellItem(1,auctionPrice,nftContract.address,{value:mintingCost});
        
        const event = await listedNft.wait();
        expect(event.events.length).to.equal(3);
        expect(event.events[2].event).to.equal("Item");
        expect(event.events[2].args.nftContract).to.equal(nftContract.address);
        expect(event.events[2].args.owner).to.equal(address1.address);
        expect(event.events[2].args.creator).to.equal("0x0000000000000000000000000000000000000000");
        expect(event.events[2].args.token).to.equal(1);
        expect(event.events[2].args.price).to.equal(auctionPrice);

      })

   })

   describe("Cancel NFT sell & Buy NFT", async function () {
    //TODO:
   })

});
