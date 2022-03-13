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
    nftContract = await nft.deploy();

  })

   describe("Deployment Test", async function () {
      it(`NFT symbol must be EXNFT`,async function (){
        expect(await nftContract.symbol()).to.equal("EXNFT");
      })
      it(`NFT name must be equal to Exchange NFT`,async function (){
        expect(await nftContract.name()).to.equal("Exchange NFT");
      })
   })

   describe("Mint & List NFT", async function () {
      // it(`Mint NFT `,async function (){
      //   await nftContract.connect(address1).safeMint("www.myNFT.com")
      //   expect(await nftContract.tokenURI(1)).to.equal("www.myNFT.com");
      //   expect(await nftContract.ownerOf(1)).to.equal(address1.address);
      //   expect(await nftContract.balanceOf(address1.address)).to.equal(1);

      // })

      it(`List NFT in marketplace`,async function (){

        const listedNft = await marketplaceContract.connect(address1).sellItem("www.myNFT.com",auctionPrice,nftContract.address,{value:mintingCost});
        
        const event = await listedNft.wait();
        expect(event.events.length).to.equal(5);
        expect(event.events[4].event).to.equal("Item");
        expect(event.events[4].args.nftContract).to.equal(nftContract.address);
        expect(event.events[4].args.owner).to.equal(marketplaceContract.address);
        expect(event.events[4].args.creator).to.equal(address1.address);
        expect(event.events[4].args.token).to.equal(1);
        expect(event.events[4].args.price).to.equal(auctionPrice);

      })

      it("Should fail if listing price less then equal to zero ", async () => {
        await expect(marketplaceContract.connect(address1).sellItem("www.myNFT.com",0,nftContract.address,{value:mintingCost})).to.be.revertedWith('Price must be at least 1 wei');
      })

      it("Should fail if minting cost is less then equal to zero ", async () => {
        await expect(marketplaceContract.connect(address1).sellItem("www.myNFT.com",auctionPrice,nftContract.address,{value:0})).to.be.revertedWith('Price must be equal to listing price');
      })

   })

   describe("Cancel NFT sell & Buy NFT", async function () {
    it(`Buy NFT`,async function (){
      await marketplaceContract.connect(address1).sellItem("www.myNFT.com",auctionPrice,nftContract.address,{value:mintingCost});
      var NFTSold = await marketplaceContract.connect(address2).buyItem(1,{value:auctionPrice.toString()})
      const event = await NFTSold.wait();

      expect(event.events.length).to.equal(3);
      expect(event.events[2].event).to.equal("Sold");
      expect(event.events[2].args.nftContract).to.equal(nftContract.address);
      expect(event.events[2].args.owner).to.equal(address2.address);
      expect(event.events[2].args.creator).to.equal(address1.address);
      expect(event.events[2].args.token).to.equal(1);
      expect(event.events[2].args.price).to.equal(auctionPrice);

    })

    it(`Cancel NFT`,async function (){
      await marketplaceContract.connect(address1).sellItem("www.myNFT.com",auctionPrice,nftContract.address,{value:mintingCost});

      const getNft = await marketplaceContract.Items(1)

      var sellCancel = await marketplaceContract.connect(address1).cancelSell(1)
      const event = await sellCancel.wait();

      expect(event.events.length).to.equal(3);
      expect(event.events[2].event).to.equal("CancelSell");
      expect(event.events[2].args.token).to.equal(1);
      expect(event.events[2].args.owner).to.equal(getNft.owner);
    })

    it("Should fail if txn amount not equal to NFT price ", async () => {
      await marketplaceContract.connect(address1).sellItem("www.myNFT.com",auctionPrice,nftContract.address,{value:mintingCost});

      await expect(marketplaceContract.connect(address2).buyItem(1,{value:"1000"})).to.be.revertedWith('Price must be equal to NFT price');
    })

    it("Should fail if someone else cancel the sell ", async () => {
      await marketplaceContract.connect(address1).sellItem("www.myNFT.com",auctionPrice,nftContract.address,{value:mintingCost});

      await expect(marketplaceContract.connect(address2).cancelSell(1)).to.be.revertedWith("Only owner can cancel listing");
    })

   })

});
  