This project is a simple Solidity-based smart contract for a decentralized bank system where users can create an account, deposit Ether, withdraw Ether, and transfer Ether to other accounts. The contract has various safety checks to make sure that only valid operations are performed, like verifying the existence of accounts and making sure there is sufficient balances before transfers or withdrawals.

## Features

- **Account Creation**: Users can create a unique account.
- **Deposit**: Users can deposit Ether into their account.
- **Withdraw**: Users can withdraw Ether from their account.
- **Transfer**: Users can transfer Ether from their account to another account.
- **Balance Checking**: Users can check their current balance.

## Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine.
- **NPM/Yarn**: You can use either npm or yarn as the package manager.
- **Hardhat**: The project uses Hardhat for deployment, testing, and interactions.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DonGuillotine/bank-smart-contract.git
cd bank-smart-contract
```

### 2. Install Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Compile the Smart Contract

Compile the smart contract using Hardhat:

```bash
npx hardhat compile
```

### 4. Deploy the Smart Contract

#### Local Deployment

To deploy the smart contract on a local network, first, start a local Ethereum network:

```bash
npx hardhat node
```

In a new terminal, deploy the contract to the local network:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

#### Testnet/Mainnet Deployment

To deploy to a testnet or mainnet, configure the network in `hardhat.config.js` with your credentials (example, Sepolia testnet):

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

```

Then deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. Interact with the Contract

You can interact with the deployed contract using Hardhat's console:

```bash
npx hardhat console --network localhost
```

### 6. Running Tests

Unit tests are located in the `test` directory. You can run the tests using:

```bash
npx hardhat test
```

The tests include:

- **Account Creation**: Verifies if accounts can be created.
- **Deposits**: Tests if deposits work correctly.
- **Withdrawals**: Checks that withdrawals only happen if there are sufficient funds.
- **Transfers**: Ensures that transfers only succeed if the sender has enough balance.
- **Insufficient Balance Checks**: Ensures that transactions fail when balances are insufficient.

### 7. Project Structure

- `contracts/`: Contains the Solidity smart contract.
- `scripts/`: Deployment scripts.
- `test/`: Contains the test scripts for the smart contract.
- `hardhat.config.js`: Hardhat configuration file.
- `package.json`: Project dependencies and scripts.

## Technologies Used

- **Solidity**: Smart contract programming language.
- **Hardhat**: Ethereum development environment.
- **Chai**: Assertion library for testing.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project was built using the Solidity language and deployed with the help of the Hardhat framework.

---

Feel free to contribute to this project by submitting issues or pull requests.

Happy coding!
