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
http-server
```

## Explanation of Frontend Script
There are two folders in the `frontend` folder

* `ethers`: EtherJS implementation of the Lottery frontend
* `web3`: Web3JS implementation of the Lottery frontend 

### Issues
* `ethers`: Uses the local testnet implemented via Hardhat, no issues.
* `web3`: Unrecongised selector error when invoking call views on the contract on Hardhat. However if the contract is deployed to Sepolia (via RemixIDE), it works fine. Any calls will go straight to `recieve` or `fallback`.

### Test Steps
1. Deploy the contract to Hardhat as described above
2. Update ABI and contract address in `ethers\contract.js`
3. Run `http-server`
4. Open `ethers\participant.html` in the browser
5. Click on "Enter Lottery". User should get the alert notifying entering the lottery is successful.
6. Click on "View Participants". User should see the list of participants in the lottery.
7. Update `web3\contract.js` to match the contract address and contract ABI
8. Open `web3\participant.html` in the browser. 
9. Click on "Enter Lottery". User should get the alert notifying entering the lottery is successful. However, checking the log for Hardhat reveals that it's the `recieve` function that is being invoked
10. Click on "View Participants". There will be an interal JSON-RPC error.
11. Inspecting the logs in hardhat show `Lottery#<unrecognised selector>` error.

### Troubleshooting Details
* Hardhat, web3, ethers: latest available stable version
* solc: 0.8.19
