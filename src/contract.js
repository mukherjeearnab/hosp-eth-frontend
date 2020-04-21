import web3 from "./web3";

const address = "0x9a648eaD75aabe78F8571a9f4Cc44Ea26c7C5A2b";

const abi = require("./ABI.json");

export default new web3.eth.Contract(abi, address);
