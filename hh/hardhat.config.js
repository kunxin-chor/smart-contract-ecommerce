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
  },
};