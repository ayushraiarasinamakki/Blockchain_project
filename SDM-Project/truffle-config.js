const path = require("path");

module.exports = {
 
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: "5777",
      host: "127.0.0.1",
      port: 7545, // for ganache gui
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },
};
