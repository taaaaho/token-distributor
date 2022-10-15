// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenDistributor is Ownable {
    struct Distributor {
        address addr;
        uint8   allocation;
    }
    uint public numDistributors = 0;
    mapping(uint => Distributor) public distributors;

    receive() external payable {
        for (uint i = 1; i <= numDistributors; i++) {
            (bool addr, ) = payable(distributors[i].addr).call{
                value: (msg.value * distributors[i].allocation) / 100
                }("");
            require(addr); 
        }
    }
    function setDistributors(bytes32[] memory addrs, bytes32[] memory allocations) public onlyOwner {
        require(addrs.length == allocations.length, 'Not match counts');
        for (uint i = 0; i < numDistributors; i++) {
            delete distributors[i];
        }
        numDistributors = 0;
        for (uint i = 0; i < addrs.length; i++) {
            numDistributors++;
            distributors[numDistributors] = Distributor
            (
                address(uint160(uint256(addrs[i]))),
                uint8(uint(allocations[i]))
            );
        }
    }

    constructor(bytes32[] memory addrs, bytes32[] memory allocations) {
        setDistributors(addrs, allocations);
    }
    
}