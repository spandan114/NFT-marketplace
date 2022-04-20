/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NFT_MARKET_CONTRACT_ADDRESS:"0x770fA3FBE1af3B4675611C1dAC2CeB6C64A877fb",
    NFT_CONTRACT_ADDRESS:"0x21f9669CE0705Dfd91ac653749ef0ED4d9E3C912"
  },
  reactStrictMode: true,
  images: {
    domains: ['ipfs.infura.io'],
  },
}

module.exports = nextConfig
