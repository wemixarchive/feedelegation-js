## Fee Delegation Transaction JavaScript Example

***
Fee Delegation Transaction(수수료 대납 트랜젝션)은 Sender가 실행 하고 싶은 Transaction의 fee(수수료)를 feePayer가 대납 해주는 서비스로 
Sender가 서명한 기존 Transaction 정보에 feePayer의 서명을 추가하여 전송하는 개념을 통하여 제공 된다. 

Fee Delegation Transaction(수수료 대납 트랜젝션)은 Sender가 서명한 기존 Transaction 중 DynamicFeeTxType 만을 지원하며 LegacyTxType, 
AccessListTxType 은 지원하지 않는다.

|      Tx Type       | Tx Type supported with fee delegation |
|:------------------:|---------------------------------------|
|    LegacyTxType    | No                                    |
|  AccessListTxType  | No                                    |
|  DynamicFeeTxType  | Yes                                   |

***
### 1. CURL 명령어를 이용한 사용 방법

personal_signTransaction method을 이용 DynamicFeeTxType(0x02) Transaction을 생성하여 raw data 을 얻는다.

```
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"personal_signTransaction","params":[{"from":"0xc3e44aac2d0457942baffa1dc3be313bc8d65627","to":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","nonce":"0x1c","value":"0xDE0B6B3A7640000","maxPriorityFeePerGas":"0x174876E801","maxFeePerGas":"0x174876E801","gas":"0x5208"},""],"id":1}' http://127.0.0.1:8588

result: {"jsonrpc":"2.0","id":1,"result":{"raw":"0x02f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","tx":{"type":"0x2","nonce":"0x1c","gasPrice":null,"maxPriorityFeePerGas":"0x174876e801","maxFeePerGas":"0x174876e801","gas":"0x5208","value":"0xde0b6b3a7640000","input":"0x","v":"0x0","r":"0xb4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32c","s":"0x82427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","to":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","chainId":"0x458","accessList":[],"hash":"0x80411634325036fe33e49104b1689f8d3ed92e2521ecfd058b26275b51471d70"}}}
``` 

Fee Delegation Transaction 을 지원하기 위해 추가된 personal_signRawFeeDelegateTransaction method 을 이용하여 Fee Delegation Transaction raw data 을 생성한다.

```
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"personal_signRawFeeDelegateTransaction","params":[{"feePayer":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f"},"0x02f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","test"],"id":1}' http://127.0.0.1:8588

result: {"jsonrpc":"2.0","id":1,"result":{"raw":"0x16f8d0f8768204581c85174876e80185174876e80182520894db8408bb47bf5e745fed00fc2c99e2f4e1a9270f880de0b6b3a764000080c080a0b4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32ca0082427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f94db8408bb47bf5e745fed00fc2c99e2f4e1a9270f80a0ba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5ca077b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb","tx":{"type":"0x17","nonce":"0x1c","gasPrice":null,"maxPriorityFeePerGas":"0x174876e801","maxFeePerGas":"0x174876e801","gas":"0x5208","value":"0xde0b6b3a7640000","input":"0x","v":"0x0","r":"0xb4dc96b4580bd1d3f090b953ea3612625dd834af8e7cc6146def84a0c137b32c","s":"0x82427bf3a4589ffe79bebad9151ece587790462cd44abdd810abe0016134b8f","to":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","chainId":"0x458","accessList":[],"hash":"0x19b5e90deb03cd4b87aca41ca09dcfed5e7c7ad33e6579f30f7efba722c54424","feePayer":"0xdb8408bb47bf5e745fed00fc2c99e2f4e1a9270f","fv":"0x0","fr":"0xba376dff9a2a4344a570367c94eeee2434a0e44ccf2da900f54becc6adaf0b5c","fs":"0x77b7d15ab7ba7213b5189094ca1bd41c7a48390767e4acb14c98f3442e561abb"}}}
``` 

eth_sendRawTransaction method 을 이용 Fee Delegation Transaction의 raw data 을 전송 한다.

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
### 2. BlockChain node console 을 이용한 방법

personal.signTransaction을 이용하여 기존 DynamicFeeTxType 의 Transaction 을 생성한다.
```
$ bin/gweimx.sh console
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
personal.signTransaction 으로 생성한 raw 와 새로 추가된 personal.signRawFeeDelegateTransaction 으로 Fee Delegation Transaction 을 생성한다.
```
$ bin/gweimx.sh console
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

sendRawTransaction 을 이용 Fee Delegation Transaction 을 전송한다.
```
$ bin/gweimx.sh console
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
### 3. web3.js , ethereumjs-util.js 와 fee delegation RLP encode,decode 을 이용한 방법

 Fee Delegation Transaction 을 지원하기 위해 제공되는 FeeDelegateDecode.js, FeeDelegateEncode.js 을 이용 기존 web3.js 을 사용하여 Fee Delegation Transaction 기능을 사용할 수 있다.

#### 사용 방법:

node js 설치 해야 한다.(https://nodejs.org/ko/download)

web3.js, ethereumjs-util.js 을 설치 한다.
```
npm install web3; npm install ethereumjs-util;
```

제공된 FeeDelegateDecode.js,FeeDelegateEncode.js, FeeDelegateSampleCode.js을 같은 폴더에 넣는다.

node 명령어를 이용 FeeDelegateSampleCode.js 을 실행 한다.(주의: wallet address 와 privateKey 을 사용 가능한 값으로 변경해야 합니다)


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


- 자세한 내용은 제공된 sample code을 참조하시면 됩니다.
  - sample code : FeeDelegateSampleCode.js
  - 참조 : https://github.com/wemixarchive/feedelegation-js


- go-wemix : https://github.com/wemixarchive/go-wemix
