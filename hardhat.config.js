require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 31337
    },
  },
  // defaultNetwork: "ropsten",
  // networks: {
  //   hardhat: {
  //   },
  //   ropsten: {
  //     url: ["ALCHEMY URL"],
  //     accounts: ['METAMASK/OTHER WALLET PRIVATE KEY'],
  //   }
  // },
};

