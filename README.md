# NFT Marketplace

https://user-images.githubusercontent.com/55044734/164286035-e01e106b-6595-4665-b0b8-7c97334c7f6e.mp4

### Marketplace features :bulb:

- [x] Mint & List Nft.
- [x] Buy NFT.
- [x] Sell NFT.
- [x] Connect with waller.


### Tech stack & packages used 📦

| package                                                             | explain                                                               |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/docs/getting-started)                  | framework                                                             |
| [ipfs-http-client ](https://www.npmjs.com/package/ipfs-http-client) | Http Client to Connect Application with IPFS                          |       
| [openzeppelin](https://www.npmjs.com/package/@openzeppelin/contracts) | For creating ERC-721 token.                                         |
| [ether.js](https://docs.ethers.io/v5/)                              | Web3 client.                                                          |
| [Chai](https://www.npmjs.com/package/chai)                          | javascript testing framework.                                         |
| [react-toastify](https://www.npmjs.com/package/react-toastify)      | For Notification.                                                     |   
| [hardhat](https://www.npmjs.com/package/hardhat)                    | Ethereum development environment.                                     | 
| [Redux](https://www.npmjs.com/package/hardhat)                      | For managing and centralizing application state.                      |   


---

- Run hardhat node
  ```
  npx hardhat node
  ```
- Run test cases
  ```
  npx hardhat test
  ```
- Deploy contract in local hardhat node
  ```
  npx hardhat run scripts/deploy.js --network localhost
  ```
- Connect hardhat with metamask
- Run react frontend
  ```
  cd client
  npm start
  ```

[ERC-721 token details](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721)

[Ethers.js documentation](https://docs.ethers.io/v5/getting-started/)

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
npx hardhat run scripts/deploy.js --network localhost
```
