const dotenv = require('dotenv');
const bnc = require('./getRequest')
const postgres = require('postgres');
const fs = require('fs');
const { time } = require('console');
dotenv.config();

const apiKey = process.env.bncKey;
const secretKey = process.env.bncSecret
const endpoint = 'https://api3.binance.com'
const path = '/sapi/v1/margin/account'
const parameters = ''
let listOfAssets = []

balance = async (apiKey, secretKey, endpoint, path, parameters) => {
    try {
        const bncSnap = await bnc(apiKey, secretKey, endpoint, path, parameters)
        // console.log(bncSnap.balances[0]);
        fs.writeFileSync("bncSnap.json", JSON.stringify(bncSnap))
        return bncSnap
    } catch (error) {
        console.log(error);
    }
}

getAssets = async () => {
    const getBalance = await balance(apiKey, secretKey, endpoint, path, parameters)
    const assets = {}
    for (let index = 0; index < getBalance.userAssets.length; index++) {
        let line = getBalance.userAssets[index]
        if (line.free>0 || line.locked>0 ) {
            let assetName = line.asset
            listOfAssets.push(assetName);
            assets[assetName] = {quantity: parseFloat(line.netAsset)};
        }
    }
    return assets
}

getPrice = async (ticker) => {
    let parameter = 'symbol=' + ticker + 'USDT'
    if (ticker=='USDT' || ticker=='BUSD') {
        return { symbol: ticker, price: '1' }
    }
    try {
        const bncPriceSnap = await bnc('', '', endpoint, '/api/v3/ticker/price', parameter)
        return bncPriceSnap
    } catch (error) {
        console.log(error);
    }
}

async function fiveParallel() {
    const assetQnt = await getAssets();
    const concurrencyLimit = 10;
    // Enhance arguments array to have an index of the argument at hand
    const argsCopy = [].concat(listOfAssets.map((val) => ({ val })));
    const result = new Array(listOfAssets.length);
    const promises = new Array(concurrencyLimit).fill(Promise.resolve());
    // Recursively chain the next Promise to the currently executed Promise
    function chainNext(p) {
      if (argsCopy.length) {
        const arg = argsCopy.shift();
        return p.then(() => {
          // Store the result into the array upon Promise completion
          const operationPromise = getPrice(arg.val).then(r => {
              result[arg.val] = r;
              result[arg.val].quantity = assetQnt[arg.val].quantity
              result[arg.val].netOfAsset = result[arg.val].quantity * result[arg.val].price
          });
          return chainNext(operationPromise);
        });
      }
      return p;
    }
    console.time('fiveParallel');
    await Promise.all(promises.map(chainNext));
    console.timeEnd('fiveParallel');
    return result;
}
  
fiveParallel().then(res => console.log(res))