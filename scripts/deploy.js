const hre = require("hardhat");

async function main() {
  const UserAccount = await hre.ethers.getContractFactory("UserAccount");
  const userAccount = await UserAccount.deploy();

  await userAccount.waitForDeployment();

  console.log("UserAccount deployed to:", await userAccount.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });