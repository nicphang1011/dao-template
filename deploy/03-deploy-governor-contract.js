const { verify } = require("../utils/verify")
const {
  developmentChains,
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
  VOTING_DELAY,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const governanceToken = await get("GovernanceToken")
  const timeLock = await get("TimeLock")

  log("----------------------------------------------------")
  log("Deploying GovernorContract and waiting for confirmations...")

  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      QUORUM_PERCENTAGE,
      VOTING_PERIOD,
      VOTING_DELAY,
    ],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  log(`GovernorContract at ${governorContract.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(governorContract.address, [])
  }
}

module.exports.tags = ["all", "governor"]
