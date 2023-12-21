# Sample Lottery Smart Contract with Frontend

## Setting up Metamask and Hardhat

The frontend assumes that the user is using Metamask. Add a new **Custom Network** to your Metamask with the following:
* Network Name: Hardhat (or anything you like)
* New RPC URL:  http://127.0.0.1:8545
* Chain ID: 31337
* Currency Symbol: ETH
* Block Explorer URL: *leave it as blank*

## Start Hardhat
```bash
cd hh
npx hardhat node
```

## Deploy 
```bash
cd hh
npx hardhat run scripts/deploy.js --network localhost
```

## Launch the Frontend
```bash
cd frontend
npm install -g http-server
```

## Explanation of Frontend Script
There are three folders in the `frontend` folder

* `ethers`: EtherJS implementation of the Lottery frontend
* `web3`: Web3JS implementation of the Lottery frontend, but *without* Metamask injection, using Hardhat as the provider directly
* `sequolia`: Web3JS implementation but using Metamask

### Issues
* `ethers`: Uses the local testnet implemented via Hardhat, no issues.
* `web3`: Unrecongised selector error when invoking call views on the contract
* `sequloia`: No issue, but it is using web3
