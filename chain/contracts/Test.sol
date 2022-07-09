//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

// Build the functiosn for check amount of Token per specific wallet address

contract Test {
    constructor() {}

    // ⬆️⬆️⬆️⬆️ VIEW FUNCTIONS ⬆️⬆️⬆️⬆️  ------------------------------------------------------------------------------

    /**
     * @notice Get the status if user is holding amount of token
     * @param _user Wallet Address
     * @param _token Token Address
     * @param _token Token Amount
     * @return bool Status if user holding amount of token
     */

    function check(
        address _user,
        address _token,
        uint256 _amount
    ) public view returns (bool) {
        require(_user != address(0), "Invalid Zero Address of Owner");
        require(_token != address(0), "Invalid Zero Address of Token");

        return IERC20(_token).balanceOf(_user) >= _amount;
    }

    /**
     * @notice Get Balance of Token that user is holding
     * @param _user Wallet Address
     * @param _token Token Address
     * @return unit256 Amount of Token that user is holding
     */

    function getBalance(address _user, address _token)
        public
        view
        returns (uint256)
    {
        require(_user != address(0), "Invalid Zero Address of Owner");
        require(_token != address(0), "Invalid Zero Address of Token");

        return IERC20(_token).balanceOf(_user);
    }
}
