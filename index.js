const dotenv = require('dotenv');
const bnc = require('./getRequest')
const postgres = require('postgres');




dotenv.config();

const apiKey = process.env.APIKEY;
const secretKey = process.env.SECRET
const endpoint = 'https://api.binance.com'
const path = '/sapi/v1/accountSnapshot'
const parameters = 'type=SPOT'

const balance = async () => {
    const bncSnap = await bnc(apiKey, secretKey, endpoint, path, parameters)
    console.log(...bncSnap);
}

balance()


