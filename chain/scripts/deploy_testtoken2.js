const { ethers } = require("hardhat");

async function main() {

    const initialSupply = ethers.utils.parseEther('10000.0')
    const TestToken2 = await ethers.getContractFactory("TestToken2");
    const token = await TestToken2.deploy(initialSupply);
    await token.deployed();

    console.log("TestToken2 deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});