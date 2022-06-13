const { verify } = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat-config")
const { ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("----------------------------------------------------")
  log("Deploying Box and waiting for confirmations...")

  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  log(`Box at ${box.address}`)

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(box.address, [])
  }
  const boxContract = await ethers.getContractAt("Box", box.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await boxContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
}

module.exports.tags = ["all", "box"]
