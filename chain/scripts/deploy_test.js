const { ethers } = require("hardhat");

async function main() {

    const Test = await ethers.getContractFactory("Test");
    const testContract = await Test.deploy();
    await testContract.deployed();

    console.log("Test deployed to:", testContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});