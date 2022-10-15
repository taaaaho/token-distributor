import { ethers } from "hardhat";

async function main() {
  let address = [
    "0xaa04355323A3bEB161161c281A802575D163E668",
    "0xD53964fEA76812b4c448357F73c9D08DbA5eBBa7",
  ];
  const args_addrs = address.map((addr) => ethers.utils.hexZeroPad(addr, 32));

  let allocations = [30, 60];
  const args_allos = allocations.map((allo) =>
    ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
  );

  const factory = await ethers.getContractFactory("TokenDistributor");
  let contract = await factory.deploy(args_addrs, args_allos);
  console.log("Contract Address is ", contract.address);

  console.log("Deploy transaction is ", contract.deployTransaction.hash);
  const cont = await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
