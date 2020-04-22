import web3 from "./web3";

const address = "0x11aBad3077eBE263B21e3541cfD17AfD9EF57E09";

const abi = require("./ABI-h.json");

export default new web3.eth.Contract(abi, address);
