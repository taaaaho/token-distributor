import { ethers } from "hardhat";

export const argAddress = () => {
  let address = [
    "0xaa04355323A3bEB161161c281A802575D163E668",
    "0xD53964fEA76812b4c448357F73c9D08DbA5eBBa7",
  ];
  return address.map((addr) => ethers.utils.hexZeroPad(addr, 32));
};

export const argAllocations = () => {
  let allocations = [30, 60];
  const args_allos = allocations.map((allo) =>
    ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
  );
  return args_allos;
};
