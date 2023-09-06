## Examples for fee delegation transaction

***
Fee Delegation Transaction is a service where the feePayer pays the fee for the transaction that the Sender wants to execute. This is done by adding the feePayer's signature to the existing transaction information signed by the Sender and sending it. Fee Delegation Transaction only supports the DynamicFeeTxType among the existing transactions signed by the Sender and does not support LegacyTxType or AccessListTxType.

|      Tx Type       | Tx Type supported with fee delegation |
|:------------------:|---------------------------------------|
|    LegacyTxType    | No                                    |
|  AccessListTxType  | No                                    |
|  DynamicFeeTxType  | Yes                                   |

***
### 1. Examples using CURL command

Firstly, create raw data of DynamicFeeTxType(0x02) transaction using personal_signTransaction method.

```
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"personal_signTransaction","params":[{"from":"0xc3e44aac2d0457942baffa1dc3be313bc8d65627","to":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","nonce":"0x1c","value":"0xDE0B6B3A7640000","maxPriorityFeePerGas":"0x174876E801","maxFeePerGas":"0x174876E801","gas":"0x5208"},""],"id":1}' http://127.0.0.1:8588

result: {"jsonrpc":"2.0","id":1,"result":{"raw":"0x02f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","tx":{"type":"0x2","nonce":"0x1c","gasPrice":null,"maxPriorityFeePerGas":"0x174876e801","maxFeePerGas":"0x174876e801","gas":"0x5208","value":"0xde0b6b3a7640000","input":"0x","v":"0x0","r":"0xb4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32c","s":"0x82427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","to":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","chainId":"0x458","accessList":[],"hash":"0x80411634325036fe33e49104b1689f8d3ed92e2521ecfd058b26275b51471d70"}}}
``` 

Secondly, create raw data of fee delegation transaction using personal_signRawFeeDelegateTransaction method (which is added to support fee delegation transaction).

```
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"personal_signRawFeeDelegateTransaction","params":[{"feePayer":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f"},"0x02f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","test"],"id":1}' http://127.0.0.1:8588

result: {"jsonrpc":"2.0","id":1,"result":{"raw":"0x16f8d0f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f94db8408bb47bf5e745fed00fc2c99e2f4e1a9270f80a0ba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5ca077b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb","tx":{"type":"0x17","nonce":"0x1c","gasPrice":null,"maxPriorityFeePerGas":"0x174876e801","maxFeePerGas":"0x174876e801","gas":"0x5208","value":"0xde0b6b3a7640000","input":"0x","v":"0x0","r":"0xb4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32c","s":"0x82427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","to":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","chainId":"0x458","accessList":[],"hash":"0x19b5e90deb03cd4b87aca41ca09dcfed5e7c7ad33e6579f30f7efba722c54424","feePayer":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","fv":"0x0","fr":"0xba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5c","fs":"0x77b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb"}}}
``` 

Finally, send signed fee delegation transaction to blockchain.

```
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0x17f8d0f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f94db8408bb47bf5e745fed00fc2c99e2f4e1a9270f80a0ba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5ca077b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb"],"id":1}' http://127.0.0.1:8588

result: {"jsonrpc":"2.0","id":1,"result":"0x19b5e90deb03cd4b87aca41ca09dcfed5e7c7ad33e6579f30f7efba722c54424"}
``` 
#### personal_signRawFeeDelegateTransaction method

parameters:

    fee delegation data : {"feePayer":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f"},

    DynamicFeeTxType raw data : "0x.....",

    feePayer wallet passwd : "test"

result:

    fee delegation transaction raw data : "0x..."
***
### 2. Examples using gwemix console

Firstly, create raw data of DynamicFeeTxType(0x02) transaction using personal.signTransaction function.
```
$ bin/gwemix.sh console
> personal.signTransaction({"from":"0xc3e44aac2d0457942baffa1dc3be313bc8d65627","to":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","nonce":"0x1c","value":"0xDE0B6B3A7640000","maxPriorityFeePerGas":"0x174876E801","maxFeePerGas":"0x174876E801","gas":"0x5208"})

{
  raw: "0x02f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f",
  tx: {
    accessList: [],
    chainId: "0x458",
    gas: "0x5208",
    gasPrice: null,
    hash: "0x80411634325036fe33e49104b1689f8d3ed92e2521ecfd058b26275b51471d70",
    input: "0x",
    maxFeePerGas: "0x174876e801",
    maxPriorityFeePerGas: "0x174876e801",
    nonce: "0x1c",
    r: "0xb4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32c",
    s: "0x82427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f",
    to: "0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f",
    type: "0x2",
    v: "0x0",
    value: "0xde0b6b3a7640000"
  }
}
```

Secondly, create raw data of fee delegation transaction using personal.signTransaction function (which is added to support fee delegation transaction).
```
$ bin/gwemix.sh console
> personal.signRawFeeDelegateTransaction({"feePayer":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f"},"0x02f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","test")

{
  raw: "0x16f8d0f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f94db8408bb47bf5e745fed00fc2c99e2f4e1a9270f80a0ba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5ca077b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb",
  tx: {
    accessList: [],
    chainId: "0x458",
    feePayer: "0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f",
    fr: "0xba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5c",
    fs: "0x77b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb",
    fv: "0x0",
    gas: "0x5208",
    gasPrice: null,
    hash: "0x19b5e90deb03cd4b87aca41ca09dcfed5e7c7ad33e6579f30f7efba722c54424",
    input: "0x",
    maxFeePerGas: "0x174876e801",
    maxPriorityFeePerGas: "0x174876e801",
    nonce: "0x1c",
    r: "0xb4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32c",
    s: "0x82427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f",
    to: "0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f",
    type: "0x16",
    v: "0x0",
    value: "0xde0b6b3a7640000"
  }
}
```

Finally, send signed fee delegation transaction to blockchain using eth.sendRawTransaction function.
```
$ bin/gwemix.sh console
> eth.sendRawTransaction('0x16f8d0f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f94db8408bb47bf5e745fed00fc2c99e2f4e1a9270f80a0ba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5ca077b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb')

0x19b5e90deb03cd4b87aca41ca09dcfed5e7c7ad33e6579f30f7efba722c54424
```
#### * personal.signRawFeeDelegateTransaction() RPC

 parameters:

    fee delegation data : {"feePayer":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f"},

    DynamicFeeTxType raw data : "0x.....",

    feePayer wallet passwd : "test"

result:

    fee delegation transaction raw data : "0x..."
***
### 3. Examples using JavaScript

To send fee delegation transaction, we provide two utility modules (FeeDelegateDecode.js and FeeDelegateEncode.js).
And these will need web3.js and ethereumjs-util.js libraries.

#### usage:

##### 1. Install node js.(https://nodejs.org/ko/download)

##### 2. Install web3.js and ethereumjs-util.js using npm.
```
npm install web3; npm install ethereumjs-util;
```

##### 3. Save FeeDelegateDecode.js,FeeDelegateEncode.js and FeeDelegateSampleCode.js in same directory.

##### 4. Execute FeeDelegateSampleCode.js using node command.(Caution: You must prepare available wallet address and private key, and deposit corresponding amount of WEMIX in advance.)
```
$ node FeeDelegateSampleCode.js

{
  messageHash: '0x6ab99cdbd98c40435e3b5a3d6626f9ca7af8921ffd6e9641b445a3e1dcf0b660',
  v: '0x1',
  r: '0x3ede6c943ae3ef85fac0cfedb084bc809188af4568eadc910c890d8d4019ce86',
  s: '0x4816f2b9de89beb71d58d364cc39ebd134fbff2e96652aa6a9343c33aa7d22e5',
  rawTransaction: '0x02f8718204588085174876e80185174876e801830186a09482667998ae5fd9e4f4637fc805e97740c673c51782010080c001a03ede6c943ae3ef85fac0cfedb084bc809188af4568eadc910c890d8d4019ce86a04816f2b9de89beb71d58d364cc39ebd134fbff2e96652aa6a9343c33aa7d22e5',
  transactionHash: '0xef161a11f427548a0866e83860dd9f9d181a19cf53f1172ab327ae15fabba763'
}
decodeRLP= 0x02
Unsigned FDDTx= {
  chainId: 1112,
  nonce: 0,
  maxPriorityFeePerGas: '0x174876e801',
  maxFeePerGas: '0x174876e801',
  gas: '0x0186a0',
  to: '0x82667998ae5fd9e4f4637fc805e97740c673c517',
  value: '0x0100',
  data: '0x',
  accessList: [],
  v: <Buffer 01>,
  r: <Buffer 3e de 6c 94 3a e3 ef 85 fa c0 cf ed b0 84 bc 80 91 88 af 45 68 ea dc 91 0c 89 0d 8d 40 19 ce 86>,
  s: <Buffer 48 16 f2 b9 de 89 be b7 1d 58 d3 64 cc 39 eb d1 34 fb ff 2e 96 65 2a a6 a9 34 3c 33 aa 7d 22 e5>,
  feePayer: '0xab046cC2e871aF34898DD45C5B7F3754B76470BC'
}
....
....
```


- Please refer to the following for details.
  - sample code : FeeDelegateSampleCode.js
  - git : https://github.com/wemixarchive/feedelegation-js


- go-wemix : https://github.com/wemixarchive/go-wemix
