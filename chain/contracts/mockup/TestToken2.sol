//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken2 is ERC20 {
    constructor(uint256 initialSupply) ERC20("TestToken2", "TTS") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address _addr, uint256 amount) public {
        _mint(_addr, amount);
    }
}
