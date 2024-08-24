// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract UserAccount {
    mapping(address => uint256) private balances;
    uint256 public constant MINIMUM_DEPOSIT = 0.01 ether;

    event AccountCreated(address indexed user);
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Transferred(address indexed from, address indexed to, uint256 amount);

    modifier accountExists(address user) {
        require(balances[user] > 0, "Account does not exist");
        _;
    }

    modifier sufficientBalance(address user, uint256 amount) {
        require(balances[user] >= amount, "Insufficient balance");
        _;
    }

    function createAccount() external payable {
        require(balances[msg.sender] == 0, "Account already exists");
        require(msg.value >= MINIMUM_DEPOSIT, "Deposit amount too low");

        balances[msg.sender] = msg.value;
        emit AccountCreated(msg.sender);
    }

    function deposit() external payable accountExists(msg.sender) {
        require(msg.value > 0, "Deposit amount must be greater than 0");

        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external accountExists(msg.sender) sufficientBalance(msg.sender, amount) {
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) external accountExists(msg.sender) sufficientBalance(msg.sender, amount) {
        require(to != address(0), "Invalid recipient address");
        require(to != msg.sender, "Cannot transfer to yourself");

        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transferred(msg.sender, to, amount);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}