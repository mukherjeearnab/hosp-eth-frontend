import web3 from "./web3";

const address = "0x38BF38541aDa16c983699aDF01b3c971dbfB5301";

const abi = require("./ABI.json");

export default new web3.eth.Contract(abi, address);
