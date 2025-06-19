require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  networks: {
    ephemery: {
      url: "https://rpc.ephemery.dev",
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: "0.8.19",
};

