const dotenv = require('dotenv');
const bnc = require('./getRequest')
const postgres = require('postgres');

dotenv.config();

const apiKey = process.env.APIKEY;
const secretKey = process.env.SECRET
const endpoint = 'https://api.binance.com'
const path = '/sapi/v1/capital/config/getall'
const parameters = ''

const balance = async (apiKey, secretKey, endpoint, path, parameters) => {
    try {
        const bncSnap = await bnc(apiKey, secretKey, endpoint, path, parameters)
        console.log(...bncSnap);
    } catch (error) {
        console.log(error);
    }
}

balance(apiKey, secretKey, endpoint, path, parameters)


