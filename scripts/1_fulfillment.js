/* eslint-disable */
const Xdc3 = require("xdc3");
require("dotenv").config();

console.log("testing", process.env.PRIVATEKEY);

async function main() {
    const xdc3 = new Xdc3(
        new Xdc3.providers.HttpProvider(process.env.RPCURL)
    );

    const deployed_private_key = process.env.PRIVATEKEY;

    //Oracle ABI & Contract address to pass here
    const oracleABI = require("../build/contracts/Oracle.json").abi;
    // console.log("oracleABI",oracleABI);
    const oraclecontractAddr = process.env.ORACLEADDRESS;
    const pluginNode = process.env.NODEADDRESS;

    //Defining OracleContract
    const oraclecontract = new xdc3.eth.Contract(oracleABI, oraclecontractAddr);
    console.log("orclecontract", oraclecontract)
    const account = xdc3.eth.accounts.privateKeyToAccount(deployed_private_key);
    const nonce = await xdc3.eth.getTransactionCount(account.address);
    const gasPrice = await xdc3.eth.getGasPrice();

    const tx = {
        nonce: nonce,
        data: oraclecontract.methods.setFulfillmentPermission(pluginNode, true).encodeABI(),
        gasPrice: gasPrice,
        to: process.env.ORACLEADDRESS,   
        from: account.address,
    };

    const gasLimit = await xdc3.eth.estimateGas(tx);
    tx["gasLimit"] = gasLimit;

    const signed = await xdc3.eth.accounts.signTransaction(
        tx,
        deployed_private_key
    );
    xdc3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .once("receipt", console.log);

    console.log("I am here");
    let status = await oraclecontract.methods.getAuthorizationStatus(pluginNode)
    console.log("Status", status);
}

main().catch(e => console.error(e));