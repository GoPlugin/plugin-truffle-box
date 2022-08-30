# Plugin - A Decentralized Oracle Network Powered by XDC
## Plugin Crypto Adapter Truffle Box - By GoPlugin

Plugin Crypto Adapter Truffle Box is a boilerplate, which allows user to bring oracle service up & running in few minutes. This template, by default pulls data from cryptocompare.com and fetch information for index pairs that you are passing from Smart Contract.

## What it does
- It allows user deploy consumer contract
- It allows user to deploy Oracle Contract
- It allows user to Run Fulfillment
- It allows user to run Adapter
- It allows user to run approve PLI transfer
- It allows user to run PLI transfer to consumer contract
- It allows user to submit request for pricing

## .env should have following parameters
- PRIVATEKEY(of your account) to migrate the contract
- PLIADDRESS=0xff7412ea7c8445c46a8254dfb557ac1e48094391 (DO NOT CHANGE, this is mainnet PLI address)
- CONSUMERADDRESS = contract address, you will get after truffle migrate
- NODEADDRESS = should get this from your plugin Node address
- JOBID=should get it from plugin node, after job creation
- ORACLEADDRESS = contract address, you will get after truffle migrate
- RPCURL=https://erpc.xinfin.network

## How to RUn
- do git clone & truffle compile
```
truffle compile
```
- do truffle migrate, this wil deploy both consumer & oracle contract in Mainnet
```
truffle migrate --network xinfin     --> for Xinfin Mainnet
```
- run Fullfillment 
```
yarn fulfilment
```
- run Adapter - this will trigger 
```
yarn adapter
```
- run approval - this is to approve the PLI transfer to your consumer contract
```
yarn approve
```
- run transfer - this will transfer 0.5 PLI to your consumer contract
```
yarn transfer
```
- run requestData - this will request PRICE conversion request from PLI to USD
```
yarn request
```

## GoPlugin Installation Documentation
- https://docs.goplugin.co/