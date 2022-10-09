import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    rinkeby: {
      url: `${process.env.INFURA_RINKEBY}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    ropsten: {
      url: `${process.env.INFURA_ROPSTEN}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    goerli: {
      url: `${process.env.ALCHEMY_GOERLI}`,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: "JPY",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "ETH",
    // gasPrice: 50,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
};

export default config;
