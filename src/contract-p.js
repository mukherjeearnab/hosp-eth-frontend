import web3 from "./web3";

const address = "0x6d5e9f77ce8F4B43836Df0f5Db3cbFF0e3861966";

const abi = require("./ABI-p.json");

export default new web3.eth.Contract(abi, address);
