import web3 from "./web3";

const address = "0xaB950F7C5c6878b17686D9F7bD794D71b0FFC81C";

const abi = require("./ABI.json");

export default new web3.eth.Contract(abi, address);
