const Consumer = artifacts.require("Consumer");
const Oracle = artifacts.require("Oracle");
require("dotenv").config();
const PLIADDRESS = process.env["PLIADDRESS"];

module.exports = async function (deployer) {
    deployer.deploy(Consumer, PLIADDRESS);
    deployer.deploy(Oracle,PLIADDRESS);
};