// SPDX-License-Identifier: MIT

pragma solidity 0.8.18; 


import {Test, console2} from "lib/forge-std/src/Test.sol";
import {ERC20} from "src/ERC20.sol";
import {DeployERC20} from "script/ERC20.s.sol";   

contract ERC20Test is Test {
     ERC20 erc20; 

    function setUp() external {
        DeployERC20 deployERC20 = new DeployERC20();
        erc20 = deployERC20.run(); 
    }

}

