// SPDX-License-Identifier: MIT


pragma solidity 0.8.18; 
 
import {Script, console2} from "lib/forge-std/src/Script.sol";

import {ERC20} from "src/ERC20.sol";


contract DeployERC20 is Script {
    function run () external returns (ERC20) {
        vm.startBroadcast();
        ERC20 erc20 = new ERC20("ERC20 Contract", "ERC20C", 2000);
        vm.stopBroadcast();
        return erc20;
    }
}


