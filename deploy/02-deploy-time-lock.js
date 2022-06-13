const { verify } = require("../utils/verify")
const { developmentChains, MIN_DELAY } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("----------------------------------------------------")
  log("Deploying TimeLock and waiting for confirmations...")

  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  log(`TimeLock at ${timeLock.address}`)

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, [])
  }
}

module.exports.tags = ["all", "timelock"]
