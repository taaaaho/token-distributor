import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { TokenDistributor } from "../typechain-types";
import { argAddress, argAllocations } from "./helper";
const provider = waffle.provider;

describe("TokenDistributor", function () {
  let owner: SignerWithAddress;
  let bob: SignerWithAddress;
  let alis: SignerWithAddress;
  let token_distributor: TokenDistributor;
  let addrs: SignerWithAddress[];

  let addr1: string = "0xaa04355323A3bEB161161c281A802575D163E668";
  let addr2: string = "0xD53964fEA76812b4c448357F73c9D08DbA5eBBa7";
  let addr3: string = "0x736C961B30aEDB6F7489e9882B0DF36a26345059";

  describe("Distribution to 2 address", function () {
    beforeEach(async function () {
      [owner, bob, alis, ...addrs] = await ethers.getSigners();
      let address = [addr1, addr2];
      const args_addrs = address.map((addr) =>
        ethers.utils.hexZeroPad(addr, 32)
      );

      let allocations = [30, 60];
      const args_allos = allocations.map((allo) =>
        ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
      );

      const contract = await ethers.getContractFactory("TokenDistributor");
      token_distributor = await contract.deploy(args_addrs, args_allos);
      await token_distributor.deployed();
    });
    it("Check", async function () {
      const params = {
        to: token_distributor.address,
        value: ethers.utils.parseUnits("1", "ether").toHexString(),
      };
      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr1))
      ).to.equal("0.0");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr2))
      ).to.equal("0.0");

      expect(
        await ethers.utils.formatEther(
          await provider.getBalance(token_distributor.address)
        )
      ).to.equal("0.0");

      await owner.sendTransaction(params);

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr1))
      ).to.equal("0.3");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr2))
      ).to.equal("0.6");

      expect(
        await ethers.utils.formatEther(
          await provider.getBalance(token_distributor.address)
        )
      ).to.equal("0.1");
    });
  });

  describe("Distribution to 3 address", function () {
    beforeEach(async function () {
      [owner, bob, alis, ...addrs] = await ethers.getSigners();
      let address = [addr1, addr2, addr3];
      const args_addrs = address.map((addr) =>
        ethers.utils.hexZeroPad(addr, 32)
      );

      let allocations = [40, 50, 10];
      const args_allos = allocations.map((allo) =>
        ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
      );

      const contract = await ethers.getContractFactory("TokenDistributor");
      token_distributor = await contract.deploy(args_addrs, args_allos);
      await token_distributor.deployed();
    });
    it("Check balance of before / after", async function () {
      const params = {
        to: token_distributor.address,
        value: ethers.utils.parseUnits("1", "ether").toHexString(),
      };
      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr1))
      ).to.equal("0.3");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr2))
      ).to.equal("0.6");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr3))
      ).to.equal("0.0");

      expect(
        await ethers.utils.formatEther(
          await provider.getBalance(token_distributor.address)
        )
      ).to.equal("0.0");

      await owner.sendTransaction(params);

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr1))
      ).to.equal("0.7");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr2))
      ).to.equal("1.1");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr3))
      ).to.equal("0.1");

      expect(
        await ethers.utils.formatEther(
          await provider.getBalance(token_distributor.address)
        )
      ).to.equal("0.0");
    });
  });

  describe("SetDistributor", function () {
    beforeEach(async function () {
      let address = [addr1, addr2, addr3];
      const args_addrs = address.map((addr) =>
        ethers.utils.hexZeroPad(addr, 32)
      );

      let allocations = [40, 50, 10];
      const args_allos = allocations.map((allo) =>
        ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
      );

      const contract = await ethers.getContractFactory("TokenDistributor");
      token_distributor = await contract.deploy(args_addrs, args_allos);
      await token_distributor.deployed();
    });
    it("Check balance of before / after", async function () {
      const params = {
        to: token_distributor.address,
        value: ethers.utils.parseUnits("1", "ether").toHexString(),
      };
      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr1))
      ).to.equal("0.7");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr2))
      ).to.equal("1.1");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr3))
      ).to.equal("0.1");

      expect(
        await ethers.utils.formatEther(
          await provider.getBalance(token_distributor.address)
        )
      ).to.equal("0.0");

      // change
      let address = [addr1, addr2];
      const args_addrs = address.map((addr) =>
        ethers.utils.hexZeroPad(addr, 32)
      );

      let allocations = [90, 10];
      const args_allos = allocations.map((allo) =>
        ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
      );
      await token_distributor.setDistributors(args_addrs, args_allos);
      await owner.sendTransaction(params);

      // after
      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr1))
      ).to.equal("1.6");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr2))
      ).to.equal("1.2");

      expect(
        await ethers.utils.formatEther(await provider.getBalance(addr3))
      ).to.equal("0.1");

      expect(
        await ethers.utils.formatEther(
          await provider.getBalance(token_distributor.address)
        )
      ).to.equal("0.0");
    });
  });

  describe("Not match args", function () {
    it("not match when deploy", async () => {
      let address = [addr1, addr2, addr3];
      const args_addrs = address.map((addr) =>
        ethers.utils.hexZeroPad(addr, 32)
      );

      let allocations = [40, 50];
      const args_allos = allocations.map((allo) =>
        ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
      );

      const contract = await ethers.getContractFactory("TokenDistributor");
      await expect(contract.deploy(args_addrs, args_allos)).to.be.revertedWith(
        "Not match counts"
      );
      await token_distributor.deployed();
    });

    it("not match when set distributor", async () => {
      let address = [addr1, addr2, addr3];
      const args_addrs = address.map((addr) =>
        ethers.utils.hexZeroPad(addr, 32)
      );

      let allocations = [40, 50, 10];
      const args_allos = allocations.map((allo) =>
        ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
      );

      const contract = await ethers.getContractFactory("TokenDistributor");
      const token_distributor = await contract.deploy(args_addrs, args_allos);
      await token_distributor.deployed();

      let change_allocations = [40, 50];
      const change_allos = change_allocations.map((allo) =>
        ethers.utils.hexZeroPad(ethers.BigNumber.from(allo).toHexString(), 32)
      );
      await expect(
        token_distributor.setDistributors(args_addrs, change_allos)
      ).to.be.revertedWith("Not match counts");
    });
  });
});
