const dotenv = require('dotenv');
const bnc = require('./getRequest')
const postgres = require('postgres');
const fs = require('fs')
dotenv.config();

const apiKey = process.env.APIKEY;
const secretKey = process.env.SECRET
const endpoint = 'https://api.binance.com'
const path = '/api/v3/account'
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
    for (let index = 0; index < getBalance.balances.length; index++) {
        if (getBalance.balances[index].free>0 || getBalance.balances[index].locked>0 ) {
            // const element = getBalance.balances[index];
            console.log(getBalance.balances[index]);
        }
    }
}

getAssets()


