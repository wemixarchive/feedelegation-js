// sample code for fee delegation transaction
const Utils = require('ethereumjs-util')
const { UnsignedTxDecode,SignedTxDecode } = require('./FeeDelegateDecode')
const { FDDUnsignedTxEncode,FDDSignedTxEncode,DUnsignedTxEncode,DSignedTxEncode } = require('./FeeDelegateEncode')

const ChainId = 1112

//from and feePayer addr info
const from_addr = "0x7973DE079945baA0BD6Ad21321b112E21DD7b354"
const from_privateKey = "0xa130bb53dfe95ad8dc480001c08af1e026593a920e1564ec19bc2abd08e74086";
const feePayer_addr = "0xab046cC2e871aF34898DD45C5B7F3754B76470BC"
const feePayer_privateKey = "0xc0357c96d357f4ac22ac02c15edc8aa00c020f898d5cbf36b2b5efd8d5a3a73c";

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8588'))

async function sample1_FeeDeleagteDynamicFeeTx(){
    //Create DynamicTxType Transaction
    let Tx = {}
    Tx.from = from_addr
    Tx.chainId = ChainId
    Tx.nonce = await web3.eth.getTransactionCount(Tx.from)
    Tx.gas = web3.utils.toHex('100000')
    Tx.maxPriorityFeePerGas = web3.utils.toHex('100000000001')
    Tx.maxFeePerGas = web3.utils.toHex('100000000001')
    Tx.to= "0x82667998ae5fd9e4f4637fc805e97740c673c517"
    Tx.value = '0x100'
    Tx.input = '0x'
    Tx.accessList = []

    let signed = await web3.eth.accounts.signTransaction(Tx, from_privateKey)
    console.log(signed)

    //Check recoverTransaction
    let recoverAddr = web3.eth.accounts.recoverTransaction(Utils.bufferToHex(signed.rawTransaction))
    if(Tx.from.toLowerCase() != recoverAddr.toLowerCase()) {
        console.log("##### Fail Check recoverTransaction recoverAddr =",recoverAddr)
        return
    }

    //decode DynamicTxType rawTransaction and create FeeDelegateDynamicTxType Transaction
    let FDDTx=SignedTxDecode(signed.rawTransaction)

    //add feePayer
    FDDTx.feePayer = feePayer_addr
    console.log("Unsigned FDDTx=",FDDTx)

    //Created FeeDeleagteDynamicTxType hash for feePayer's sign
    let [uTxHash, uTypeTxHex] = FDDUnsignedTxEncode(FDDTx);
    console.log("uTypeTxHex=",uTypeTxHex)

    //Sign FeeDeleagteDynamicTxType hash with feePayer's key
    let FDsignature = Utils.ecsign(Utils.toBuffer(uTxHash), Utils.toBuffer(feePayer_privateKey))

    //Check ecrecover
    let FDpubKey = Utils.ecrecover(Utils.toBuffer(uTxHash),FDsignature.v,FDsignature.r,FDsignature.s)
    let ecrecoverFDAddr = Utils.bufferToHex(Utils.pubToAddress(FDpubKey));

    if (FDDTx.feePayer.toLowerCase() != ecrecoverFDAddr.toLowerCase()) {
        console.log("##### Fail Check ecrecover ecrecoverFDAddr =", ecrecoverFDAddr)
        return
    }

    //add feePayer's v,r,s
    if(FDsignature.v == 27) FDsignature.v=0
    else if(FDsignature.v == 28) FDsignature.v=1
    FDDTx.fv = FDsignature.v
    FDDTx.fr = Utils.bnToHex(new Utils.BN(FDsignature.r))
    FDDTx.fs = Utils.bnToHex(new Utils.BN(FDsignature.s))
    console.log("Signed FeeDeleagteDynamicTxType =",FDDTx)

    //Created FeeDeleagteDynamicTxType hash for feePayer's sign
    let [hash,rawTransaction] = FDDSignedTxEncode(FDDTx)
    console.log("FeeDelegateTX hash=",hash,"\nFeeDelegateTX rawTransaction=",rawTransaction)

    let FeeDelegateDecodeTX=SignedTxDecode(rawTransaction)
    console.log("FeeDelegateDecodeTX=",FeeDelegateDecodeTX)

    //Send FeeDeleagteDynamicTx rawTransaction
    try{
        let result = await web3.eth.sendSignedTransaction(rawTransaction)
        console.log("sendSignedTransaction result=",result)
    }catch (e) {
        console.log(e.toString())
    }
}

async function sample2_FeeDeleagteDynamicFeeTx() {
    //Create DynamicTxType Transaction
    let Tx = {}
    Tx.from = from_addr
    Tx.chainId = ChainId
    Tx.nonce = await web3.eth.getTransactionCount(Tx.from)
    Tx.gas = web3.utils.toHex('100000')
    Tx.maxPriorityFeePerGas = web3.utils.toHex('100000000001')
    Tx.maxFeePerGas = web3.utils.toHex('100000000001')
    Tx.to = "0x82667998ae5fd9e4f4637fc805e97740c673c517"
    Tx.value = '0x100000'
    Tx.input = '0x'
    Tx.accessList = []

    console.log("Unsigned DynamicTxType =", Tx)

    //Created DynamicTxType Unsigned hash for from's sign
    let [uHash, uTxHex] = DUnsignedTxEncode(Tx);

    //Sign DynamicTxType hash with from's key
    let signature = Utils.ecsign(Utils.toBuffer(uHash), Utils.toBuffer(from_privateKey))

    //Check ecrecover
    let pubKey = Utils.ecrecover(Utils.toBuffer(uHash),signature.v,signature.r,signature.s)
    let ecrecoverAddr = Utils.bufferToHex(Utils.pubToAddress(pubKey));

    if (Tx.from.toLowerCase() != ecrecoverAddr.toLowerCase()) {
        console.log("##### Fail Check ecrecover ecrecoverAddr =", ecrecoverAddr)
        return
    }

    //add from's v,r,s
    if(signature.v == 27) signature.v=0
    else if(signature.v == 28) signature.v=1
    Tx.v = signature.v
    Tx.r = Utils.bnToHex(new Utils.BN(signature.r))
    Tx.s = Utils.bnToHex(new Utils.BN(signature.s))

    console.log("Signed DynamicTxType =", Tx)

    //Created FeeDeleagteDynamicTxType hash for feePayer's sign
    let [shash, sTxHex] = DSignedTxEncode(Tx)
    console.log("DynamicTx shash=", shash, "\nDynamicTx sTxHex=", sTxHex)

    //add feePayer
    Tx.feePayer = feePayer_addr
    console.log("Unsigned FDDTx=", Tx)

    //Created FeeDeleagteDynamicTxType hash for feePayer's sign
    let [uTxHash, uTypeTxHex] = FDDUnsignedTxEncode(Tx);

    //Sign FeeDeleagteDynamicTxType hash with feePayer's key
    let FDsignature = Utils.ecsign(Utils.toBuffer(uTxHash), Utils.toBuffer(feePayer_privateKey))

    //Check ecrecover
    let FDpubKey = Utils.ecrecover(Utils.toBuffer(uTxHash),FDsignature.v,FDsignature.r,FDsignature.s)
    let ecrecoverFDAddr = Utils.bufferToHex(Utils.pubToAddress(FDpubKey));

    if (Tx.feePayer.toLowerCase() != ecrecoverFDAddr.toLowerCase()) {
        console.log("##### Fail Check ecrecover ecrecoverFDAddr =", ecrecoverFDAddr)
        return
    }

    //add feePayer's v,r,s
    if(FDsignature.v == 27) FDsignature.v=0
    else if(FDsignature.v == 28) FDsignature.v=1
    Tx.fv = FDsignature.v
    Tx.fr = Utils.bnToHex(new Utils.BN(FDsignature.r))
    Tx.fs = Utils.bnToHex(new Utils.BN(FDsignature.s))
    console.log("Signed FeeDeleagteDynamicTxType =", Tx)

    //Created FeeDeleagteDynamicTxType hash for feePayer's sign
    let [hash, rawTransaction] = FDDSignedTxEncode(Tx)
    console.log("FeeDelegateTX hash=", hash, "\nFeeDelegateTX rawTransaction=", rawTransaction)

    let FeeDelegateDecodeTX = SignedTxDecode(rawTransaction)
    console.log("FeeDelegateDecodeTX=", FeeDelegateDecodeTX)

    //Send FeeDeleagteDynamicTx rawTransaction
    try {
        let result = await web3.eth.sendSignedTransaction(rawTransaction)
        console.log("sendSignedTransaction result=", result)
    } catch (e) {
        console.log(e.toString())
    }
}

//run sample1, sample2
sample1_FeeDeleagteDynamicFeeTx()
// sample2_FeeDeleagteDynamicFeeTx()




