# Setting up Metamask and Hardhat

In Metamask, add a new public network manually with the chain id: `31337`.

## To start hardhat
    
    ```bash
    cd hh
    npx hardhat node
    ```
## To deploy script
Open a new terminal and run the following command:

    ```bash
    cd hh
    npx hardhat run scripts/deploy.js --network localhost
    ```

## To run the frontend

    ```bash
    cd frontend
    npm install -g http-server
    ```
    

