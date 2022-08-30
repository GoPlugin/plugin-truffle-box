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
    const pluginNode = process.env.NODEADDRESS;

    //Defining tokenContract
    const tokenContract = new xdc3.eth.Contract(tokenABI, process.env.PLIADDRESS);
    // console.log("tokenContract", tokenContract)

    const _tokens = 0.5;
    const tokens = await convertTokens(_tokens);
    console.log("Tokens are", tokens);
    const account = xdc3.eth.accounts.privateKeyToAccount(deployed_private_key);
    const nonce = await xdc3.eth.getTransactionCount(account.address);
    const gasPrice = await xdc3.eth.getGasPrice();
    const gasPrice1 = await xdc3.eth.getGasPrice();

    const tx1 = {
        nonce: nonce,
        data: tokenContract.methods.transfer(process.env.CONSUMERADDRESS, tokens).encodeABI(),
        gasPrice: gasPrice1,
        to: process.env.PLIADDRESS,
        from: account.address,
    };

    // const gasLimit1 = await xdc3.eth.estimateGas(tx);
    tx1["gasLimit"] = 21000000;

    const signed1 = await xdc3.eth.accounts.signTransaction(
        tx1,
        deployed_private_key
    );

    xdc3.eth
        .sendSignedTransaction(signed1.rawTransaction)
        .once("receipt", console.log);

    console.log("Success second txn")

}

main().catch(e => console.error(e));