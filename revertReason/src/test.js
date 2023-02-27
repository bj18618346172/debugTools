const RevertReason = require('./commands/revert-reason');
const Web3 = require('web3');

const urlInt="http://139.198.104.233:18545"
const urlTest="https://gwan-ssl.wandevs.org:46891"
const urlMain="https://gwan-ssl.wandevs.org:56891"

const web3Int = new Web3(new Web3.providers.HttpProvider("http://139.198.104.233:18545"));
const web3Test = new Web3(new Web3.providers.HttpProvider("https://gwan-ssl.wandevs.org:46891"));

const optimist = require('optimist');
   let argv = optimist
        .usage("Usage: $0")
        .alias('h', 'help')
        .describe('tx', 'txHash')
        .string('tx')
        .describe('network', 'network')
        .string('network')
        .argv;

  if(parseInt(Object.getOwnPropertyNames(optimist.argv).length) <= 2){
      optimist.showHelp();
      process.exit(0);
 }


console.log(argv);

let web3Final = web3Test;
let url=urlTest;
if(argv["network"] == "testnet"){
    web3Final = web3Test
    url=urlTest;
}

if(argv["network"] == "mainnet"){
    web3Final = web3
    url=urlMain
}

if(argv["network"] == "internal"){
    web3Final = web3Int
    url=urlInt
}

let revert1 = new RevertReason(
  web3Final, 
  url, 
  argv["tx"]);
revert1.execute().then(console.log).catch(console.log);
//revert1.execute().then(console.log)

/*
 * node test.js --network testnet --tx "0xc4b844a06bffacc602048715702068445599c3e9f8edd67e1b8ebba88f74aa8d"
 *
 */
