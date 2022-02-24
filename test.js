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
        console.log(new Date(), ticker);
        const bncPriceSnap = await bnc('', '', endpoint, '/api/v3/ticker/price', parameter)
        console.log(new Date(), ticker);
        return bncPriceSnap
    } catch (error) {
        console.log(error);
    }
    
}



getPrice('BTC')
getPrice('ETH')
getPrice('SOL')
getPrice('ADA')
getPrice('AVAX')
getPrice('EOS')
getPrice('BTC')



