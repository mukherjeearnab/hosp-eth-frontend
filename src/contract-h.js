import web3 from "./web3";

const address = "0xe4ABA975b4d6f897e70e3B7124685db9fDc13619";

const abi = require("./ABI-h.json");

export default new web3.eth.Contract(abi, address);
