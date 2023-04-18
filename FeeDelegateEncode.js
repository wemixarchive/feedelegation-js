module.exports = { FDDUnsignedTxEncode,FDDSignedTxEncode,DUnsignedTxEncode,DSignedTxEncode }

const Utils = require('ethereumjs-util')
const RLP = Utils.rlp
const D_TxType = "0x02"
const FD_TxType = "0x16"

// Fee Delegate(FD) DynamicFeeTx Unsigned RLP encode
function FDDUnsignedTxEncode(Tx){
    let txRlp = RLP.encode([
        [
            Tx.chainId,
            Tx.nonce,
            Tx.maxPriorityFeePerGas,
            Tx.maxFeePerGas,
            Tx.gas,
            Tx.to,
            Tx.value,
            Tx.input,
            Tx.accessList,
            Tx.v,
            Tx.r,
            Tx.s
        ],
        Tx.feePayer
    ])

    let typeTxHex = FD_TxType+Utils.bufferToHex(txRlp).slice(2)
    let txHash = Utils.bufferToHex(Utils.keccak256(Utils.toBuffer(typeTxHex)))

    return [txHash,typeTxHex]
}

// Fee Delegate(FD) DynamicFeeTx Signed RLP encode
function FDDSignedTxEncode(Tx){
    let txRlp = RLP.encode([
        [
            Tx.chainId,
            Tx.nonce,
            Tx.maxPriorityFeePerGas,
            Tx.maxFeePerGas,
            Tx.gas,
            Tx.to,
            Tx.value,
            Tx.input,
            Tx.accessList,
            Tx.v,
            Tx.r,
            Tx.s
        ],
        Tx.feePayer,
        Tx.fv,
        Tx.fr,
        Tx.fs,
    ])

    let typeTxHex = FD_TxType+Utils.bufferToHex(txRlp).slice(2)
    let txHash = Utils.bufferToHex(Utils.keccak256(Utils.toBuffer(typeTxHex)))

    return [txHash,typeTxHex]
}

// DynamicFeeTx Unsigned RLP encode
function DUnsignedTxEncode(Tx){
    let txRlp = RLP.encode([
        Tx.chainId,
        Tx.nonce,
        Tx.maxPriorityFeePerGas,
        Tx.maxFeePerGas,
        Tx.gas,
        Tx.to,
        Tx.value,
        Tx.input,
        Tx.accessList,
    ])

    let typeTxHex = D_TxType+Utils.bufferToHex(txRlp).slice(2)
    let txHash = Utils.bufferToHex(Utils.keccak256(Utils.toBuffer(typeTxHex)))

    return [txHash,typeTxHex]
}

// DynamicFeeTx Signed RLP encode
function DSignedTxEncode(Tx){
    let txRlp = RLP.encode([
        Tx.chainId,
        Tx.nonce,
        Tx.maxPriorityFeePerGas,
        Tx.maxFeePerGas,
        Tx.gas,
        Tx.to,
        Tx.value,
        Tx.input,
        Tx.accessList,
        Tx.v,
        Tx.r,
        Tx.s,
    ])

    let typeTxHex = D_TxType+Utils.bufferToHex(txRlp).slice(2)
    let txHash = Utils.bufferToHex(Utils.keccak256(Utils.toBuffer(typeTxHex)))

    return [txHash,typeTxHex]
}
