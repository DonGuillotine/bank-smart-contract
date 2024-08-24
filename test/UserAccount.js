const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserAccount", function () {
  let UserAccount;
  let userAccount;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    UserAccount = await ethers.getContractFactory("UserAccount");
    [owner, addr1, addr2] = await ethers.getSigners();
    userAccount = await UserAccount.deploy();
    await userAccount.waitForDeployment();
  });

  describe("Account Creation", function () {
    it("Should create an account with minimum deposit", async function () {
      await expect(userAccount.connect(addr1).createAccount({ value: ethers.parseEther("0.01") }))
        .to.emit(userAccount, "AccountCreated")
        .withArgs(addr1.address);
    });

    it("Should fail to create an account with insufficient deposit", async function () {
      await expect(userAccount.connect(addr1).createAccount({ value: ethers.parseEther("0.009") }))
        .to.be.revertedWith("Deposit amount too low");
    });
  });

  describe("Deposit", function () {
    it("Should allow deposit after account creation", async function () {
      await userAccount.connect(addr1).createAccount({ value: ethers.parseEther("0.01") });
      await expect(userAccount.connect(addr1).deposit({ value: ethers.parseEther("0.05") }))
        .to.emit(userAccount, "Deposited")
        .withArgs(addr1.address, ethers.parseEther("0.05"));
    });
  });

  describe("Withdraw", function () {
    it("Should allow withdrawal of available funds", async function () {
      await userAccount.connect(addr1).createAccount({ value: ethers.parseEther("0.05") });
      await expect(userAccount.connect(addr1).withdraw(ethers.parseEther("0.03")))
        .to.emit(userAccount, "Withdrawn")
        .withArgs(addr1.address, ethers.parseEther("0.03"));
    });

    it("Should fail to withdraw more than available balance", async function () {
      await userAccount.connect(addr1).createAccount({ value: ethers.parseEther("0.05") });
      await expect(userAccount.connect(addr1).withdraw(ethers.parseEther("0.06")))
        .to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Transfer", function () {
    it("Should allow transfer between accounts", async function () {
      await userAccount.connect(addr1).createAccount({ value: ethers.parseEther("0.05") });
      await userAccount.connect(addr2).createAccount({ value: ethers.parseEther("0.01") });
      await expect(userAccount.connect(addr1).transfer(addr2.address, ethers.parseEther("0.02")))
        .to.emit(userAccount, "Transferred")
        .withArgs(addr1.address, addr2.address, ethers.parseEther("0.02"));
    });

    it("Should fail to transfer more than available balance", async function () {
      await userAccount.connect(addr1).createAccount({ value: ethers.parseEther("0.05") });
      await userAccount.connect(addr2).createAccount({ value: ethers.parseEther("0.01") });
      await expect(userAccount.connect(addr1).transfer(addr2.address, ethers.parseEther("0.06")))
        .to.be.revertedWith("Insufficient balance");
    });
  });
});