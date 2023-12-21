// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Lottery {
    address public manager;
    address payable[] public participants;

    constructor() {
        console.log("Contract deployed");
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= .01 ether, "Minimum 0.01 ETH required to enter");
        participants.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        block.timestamp,
                        participants
                    )
                )
            );
    }

    function pickWinner() public restricted {
        require(msg.sender == manager, "Only the manager can pick a winner");
        require(participants.length > 3, "Not enough participants");

        uint index = random() % participants.length;
        participants[index].transfer(address(this).balance);

        // Reset the lottery for the next round
        participants = new address payable[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getParticipants() public view returns (address payable[] memory) {
        console.log("getParticipants() called");
        return participants;
    }

    function getFortyTwo() public pure returns (int) {
        return 42;
    }

    fallback() external payable {
        console.logBytes4(msg.sig);
    }

    receive() external payable {
          console.logBytes4(msg.sig);
        console.log("receive() called");
    }
}
