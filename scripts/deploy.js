
const hre = require("hardhat");

async function main() {

  // We get the contract to deploy

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const NFTMarketContract = await NFTMarket.deploy();

  const NFT = await hre.ethers.getContractFactory("NFT");
  const NFTContract = await NFT.deploy(NFTMarketContract.address);

  await NFTMarketContract.deployed();
  await NFTContract.deployed();

  console.log("NFTMarketContract deployed to:", NFTMarketContract.address);
  console.log("NFTContract deployed to:", NFTContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
