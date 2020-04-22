import web3 from "./web3";

const address = "0x8c7E4B42E007036d3924060e6261a69D30df7017";

const abi = require("./ABI-p.json");

export default new web3.eth.Contract(abi, address);
