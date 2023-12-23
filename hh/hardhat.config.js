// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();
// module.exports = {
//   solidity: "0.8.19"
// };

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {     
      chainId: 31337,     
      gas: "auto",
      gasPrice: "auto"
    },
    ganache: {
      url: "http://127.0.0.1:7545", // update this according to ganache ui
      chainId: 1337
    }
  },
};