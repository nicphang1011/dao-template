const networkConfig = {
  31337: {
      name: "localhost",
      subscriptionId: "5627",
      entranceFee: ethers.utils.parseEther("0.01"),
      gasLane:
          "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
      callbackGasLimit: "500000",
      interval: "30",
      mintFee: "10000000000000000",
      ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  },
  4: {
      name: "rinkeby",
      vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
      entranceFee: ethers.utils.parseEther("0.01"),
      gasLane:
          "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
      subscriptionId: "5627",
      callbackGasLimit: "500000",
      interval: "30",
      mintFee: "10000000000000000",
      ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
}

const developmentChains = ["hardhat", "localhost"]
const proposalsFile = "proposals.json"

// Governor Values
const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
const MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
const VOTING_PERIOD = 5 // blocks
const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

const NEW_STORE_VALUE = 77
const FUNC = "store"
const PROPOSAL_DESCRIPTION = "Proposal #1 77 in the Box!"

module.exports = {
  networkConfig,
  developmentChains,
  proposalsFile,
  QUORUM_PERCENTAGE,
  MIN_DELAY,
  VOTING_PERIOD,
  VOTING_DELAY,
  ADDRESS_ZERO,
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
}