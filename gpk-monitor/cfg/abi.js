const smgAbi = require('./abis/abi.StoremanGroupDelegate.json');
const gpkAbi = require('./abis/abi.GpkDelegateV2.json');

const abiMap = new Map([
    ["smg", smgAbi],
    ["gpk", gpkAbi]
]);

module.exports = abiMap;
