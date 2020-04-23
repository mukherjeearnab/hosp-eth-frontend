import web3 from "./web3";

const address = "0xEEb4dbEB27040434d9BC5d012C4e1D0d5Acc2bFd";

const abi = require("./ABI-p.json");

export default new web3.eth.Contract(abi, address);
