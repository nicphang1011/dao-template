require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
}
