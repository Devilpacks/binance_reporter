const dotenv = require('dotenv');
const bnc = require('./getRequest')
const postgres = require('postgres');
const fs = require('fs')
dotenv.config();

const apiKey = process.env.bncKey;
const secretKey = process.env.bncSecret
const endpoint = 'https://api3.binance.com'
const path = '/sapi/v1/margin/account'
const parameters = ''

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
    const element = {}
    for (let index = 0; index < getBalance.userAssets.length; index++) {
        let line = getBalance.userAssets[index]
        if (line.free>0 || line.locked>0 ) {
            let assetName = line.asset
            element[assetName] = parseFloat(line.free)+parseFloat(line.locked);
            console.log(line);
        }
    }
    console.log(element);
}

getAssets()


