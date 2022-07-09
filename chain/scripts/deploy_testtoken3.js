const { ethers } = require("hardhat");

async function main() {

    const initialSupply = ethers.utils.parseEther('10000.0')
    const TestToken3 = await ethers.getContractFactory("TestToken3");
    const token = await TestToken3.deploy(initialSupply);
    await token.deployed();

    console.log("TestToken3 deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});