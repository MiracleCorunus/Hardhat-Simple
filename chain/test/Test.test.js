const Test = require('../artifacts/contracts/Test.sol/Test.json');

const { expect } = require("chai");
const { ethers } = require("hardhat");

const initialSupply = ethers.utils.parseEther('10000.0')

const sendAmountForToken1 = ethers.utils.parseEther('100.0')
const sendAmountForToken2 = ethers.utils.parseEther('200.0')
const sendAmountForToken3 = ethers.utils.parseEther('300.0')

describe("Test Contract", function () {
    before(async function () {

        // Get Test signers from Ether.js
        [deployer, david] = await ethers.getSigners();

        // Deploy the TestToken1 for test

        const TestToken1 = await ethers.getContractFactory("TestToken1");
        this.testToken1 = await TestToken1.deploy(initialSupply);
        await this.testToken1.deployed();

        // Expectation for totalSupply of TestToken1
        expect(await this.testToken1.totalSupply()).to.equal(initialSupply);

        // Deploy the TestToken2 for test
        const TestToken2 = await ethers.getContractFactory("TestToken2");
        this.testToken2 = await TestToken2.deploy(initialSupply);
        await this.testToken2.deployed();

        // Expectation for totalSupply of TestToken2
        expect(await this.testToken2.totalSupply()).to.equal(initialSupply);

        // Deploy the TestToken2 for test
        const TestToken3 = await ethers.getContractFactory("TestToken3");
        this.testToken3 = await TestToken3.deploy(initialSupply);
        await this.testToken3.deployed();

        // Expectation for totalSupply of TestToken3
        expect(await this.testToken3.totalSupply()).to.equal(initialSupply);

        // Approve 100 testToken1 to david
        await this.testToken1.connect(deployer).approve(david.address, sendAmountForToken1);
        // Send 100 testToken1 to david
        await this.testToken1.connect(david).transferFrom(deployer.address, david.address, sendAmountForToken1);
        // Expectation if david receives 100 testToken1
        expect(await this.testToken1.balanceOf(david.address)).to.equal(sendAmountForToken1);


        // Approve 100 testToken2 to david
        await this.testToken2.connect(deployer).approve(david.address, sendAmountForToken2);
        // Send 100 testToken2 to david
        await this.testToken2.connect(david).transferFrom(deployer.address, david.address, sendAmountForToken2);
        // Expectation if david receives 100 testToken2
        expect(await this.testToken2.balanceOf(david.address)).to.equal(sendAmountForToken2);

        // Approve 100 testToken3 to david
        await this.testToken3.connect(deployer).approve(david.address, sendAmountForToken3);
        // Send 100 testToken3 to david
        await this.testToken3.connect(david).transferFrom(deployer.address, david.address, sendAmountForToken3);
        // Expectation if david receives 100 testToken3
        expect(await this.testToken3.balanceOf(david.address)).to.equal(sendAmountForToken3);

        // Deploy the Test Contract
        this.testContract = await (await ethers.getContractFactory("Test", deployer)).deploy();
    })

    it("Test for check function of Test contract", async function () {

        //Check function for testToken1
        expect(await this.testContract.check(david.address, this.testToken1.address, sendAmountForToken1)).to.equal(true);
        expect(await this.testContract.check(david.address, this.testToken1.address, sendAmountForToken1 + 100)).to.equal(false);

        //Check function for testToken2
        expect(await this.testContract.check(david.address, this.testToken2.address, sendAmountForToken2)).to.equal(true);
        expect(await this.testContract.check(david.address, this.testToken2.address, sendAmountForToken2 + 100)).to.equal(false);

        //Check function for testToken3
        expect(await this.testContract.check(david.address, this.testToken3.address, sendAmountForToken3)).to.equal(true);
        expect(await this.testContract.check(david.address, this.testToken3.address, sendAmountForToken3 + 100)).to.equal(false);
    });
});