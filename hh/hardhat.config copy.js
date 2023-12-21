require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {     
      chainId: 1337,
      from: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
    },
  },
};