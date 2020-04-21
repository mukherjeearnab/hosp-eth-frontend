import web3 from "./web3";

const address = "0x56C0c83c466402E709a92aB07d9AE1489f8d5a14";

const abi = require("./ABI.json");

export default new web3.eth.Contract(abi, address);
