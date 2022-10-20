const KGSample = artifacts.require("KGSample");
const Oracle = artifacts.require("Oracle");
require("dotenv").config();
const PLIADDRESS = process.env["PLIADDRESS"];

module.exports = async function (deployer) {
    deployer.deploy(KGSample);
    deployer.deploy(Oracle,PLIADDRESS);
};