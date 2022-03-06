const { expect } = require("chai");

describe("NFT Market", async function () {

  const [owner, address1, address2, feeAccount, address4, address5, ...address] = await ethers.getSigners();

   beforeEach(async () => {
    const exchange = await ethers.getContractFactory("NFTMarket"); //create instance
    exchangeContract = await exchange.deploy(owner.address); //Deploy contract
  
    })

  it("Mint & List NFT ", async function () {

  });
});
