const hre = require("hardhat");

(async () => {
    try {
        // Access the 'from' address from the network config
        let deployerAddress = hre.network.config.from;

        // If 'from' is not defined in the config, get the first signer
        if (!deployerAddress) {
            [deployerAddress] = await hre.ethers.getSigners();
            deployerAddress = deployerAddress.address;
        }

        let ContractFactory = await hre.ethers.getContractFactory("Lottery");
        let contract = await ContractFactory.deploy();
        await contract.waitForDeployment();  // Add this line
        console.log("Contract address:", await contract.getAddress());
        console.log("Deployed by address:", deployerAddress);

    } catch (err) {
        console.log('Error deploying contract: ', err);
    }
})();
