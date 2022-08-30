/* eslint-disable */
const Xdc3 = require("xdc3");
require("dotenv").config();

console.log("testing", process.env.PRIVATEKEY, process.env.CONSUMERADDRESS);

const convertTokens = async (n) => {
    b = new Xdc3.utils.BN(Xdc3.utils.toWei(n.toString(), 'ether'));
    return b;
}

async function main() {
    const xdc3 = new Xdc3(
        new Xdc3.providers.HttpProvider(process.env.RPCURL)
    );

    const deployed_private_key = process.env.PRIVATEKEY;
    //Request ABI & Contract address to pass here
    const tokenABI = require("../build/contracts/PliTokenInterface.json").abi;
    const requestABi = require("../build/contracts/Consumer.json").abi;
    const pluginNode = process.env.NODEADDRESS;

    //Defining tokenContract
    const tokenContract = new xdc3.eth.Contract(tokenABI, process.env.PLIADDRESS);
    // console.log("tokenContract", tokenContract)
    //Defining tokenContract
    const requestContract = new xdc3.eth.Contract(requestABi, process.env.CONSUMERADDRESS);
    // console.log("requestContract", requestContract)

    const _tokens = 0.5;
    const tokens = await convertTokens(_tokens);
    console.log("Tokens are", tokens);
    const account = xdc3.eth.accounts.privateKeyToAccount(deployed_private_key);
    const nonce = await xdc3.eth.getTransactionCount(account.address);
    const gasPrice = await xdc3.eth.getGasPrice();
    console.log("gasPrice",gasPrice)
    const tx = {
        nonce: nonce,
        data: tokenContract.methods.approve(process.env.CONSUMERADDRESS, tokens).encodeABI(),
        gasPrice: gasPrice,
        to: process.env.PLIADDRESS,
        from: account.address,
    };

    // const gasLimit = await xdc3.eth.estimateGas(tx);
    tx["gasLimit"] = 210000;
    // console.log("Gas limit is", gasLimit);

    const signed = await xdc3.eth.accounts.signTransaction(
        tx,
        deployed_private_key
    );
    xdc3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .once("receipt", console.log);

    console.log("Success first txn");

}

main().catch(e => console.error(e));