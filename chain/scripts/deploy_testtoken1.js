const { ethers } = require("hardhat");

async function main() {

    const initialSupply = ethers.utils.parseEther('10000.0')
    const TestToken1 = await ethers.getContractFactory("TestToken1");
    const token = await TestToken1.deploy(initialSupply);
    await token.deployed();

    console.log("TestToken1 deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});