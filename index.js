const dotenv = require('dotenv');
const bnc = require('./getRequest')
const postgres = require('postgres');
const fs = require('fs')
dotenv.config();

const apiKey = process.env.bncKey;
const secretKey = process.env.bncSecret
const endpoint = 'https://fapi.binance.com'
const path = '/fapi/v1/account'
const parameters = ''

const balance = async (apiKey, secretKey, endpoint, path, parameters) => {
    try {
        const bncSnap = await bnc(apiKey, secretKey, endpoint, path, parameters)
        fs.writeFileSync("bncSnap.json", JSON.stringify(bncSnap))
        var jsonBncAccount = JSON.stringify(bncSnap);
        var balance_bnc_usd = parseFloat(bncSnap.totalMarginBalance);
        let gross_margin = balance_bnc_usd;
        let used_margin = balance_bnc_usd - bncSnap.maxWithdrawAmount;
        // let calc_margin = (balance_bnc_usd > 0) ? position_bnc_usd / bncLeverage : 0.0;
        console.log(gross_margin, used_margin, used_margin/gross_margin, bncSnap.totalInitialMargin, bncSnap.totalMaintMargin, bncSnap.totalPositionInitialMargin, bncSnap.totalOpenOrderInitialMargin);
    } catch (error) {
        console.log(error);
    }
}

balance(apiKey, secretKey, endpoint, path, parameters)


