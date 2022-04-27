// Request URL: https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search
// Request Method: POST
// Status Code: 200 
// Remote Address: 108.156.22.94:443
// Referrer Policy: origin-when-cross-origin

// :authority: p2p.binance.com
// :method: POST
// :path: /bapi/c2c/v2/friendly/c2c/adv/search
// :scheme: https
// accept: */*
// accept-encoding: gzip, deflate, br
// accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7
// bnc-uuid: 2081cdfd-29bd-4f9e-98a0-a9045aa4a96a
// c2ctype: c2c_merchant
// clienttype: web
// content-length: 110
// content-type: application/json
// lang: ru
// origin: https://p2p.binance.com
// referer: https://p2p.binance.com/ru/trade/Tinkoff/USDT?fiat=RUB
// sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Linux"
// sec-fetch-dest: empty
// sec-fetch-mode: cors
// sec-fetch-site: same-origin
// user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36
// x-trace-id: f51ca46c-d31f-41a5-8ad1-f7aaef2d7265
// x-ui-request-trace: f51ca46c-d31f-41a5-8ad1-f7aaef2d7265

// PAYLOAD EXAMPLE
// {"page":1,"rows":10,"payTypes":["Tinkoff"],"publisherType":null,"asset":"USDT","tradeType":"BUY","fiat":"RUB"}
const fetch = require('node-fetch');
const crypto = require('crypto')

const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config();

const endpoint = 'https://p2p.binance.com'
const path = '/bapi/c2c/v2/friendly/c2c/adv/search'
const payload = {"page":1,"rows":20,"payTypes":["Tinkoff"],"publisherType":null,"asset":"USDT","tradeType":"BUY","fiat":"RUB"}

const checkResponseStatus = (res) => {
    if(res.ok){
        return res
    }
    else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`)
    }
}

const postRequest = async (endpoint, path, payload) => {
    // console.log(`${endpoint}${path}?${message}`, new Date());
    let snap
    const makeRequest = await fetch(`${endpoint}${path}`, {
        method: 'post',
        body:    JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(checkResponseStatus)
    .then(res => res.json())
    .then(json => snap = json)
    .then(json => console.log(json.data.length))
    return snap
}

const p2p = async (endpoint, path, payload) => {
    try {
        const bncP2pSnap = await postRequest(endpoint, path, payload)
        // console.log(bncSnap.balances[0]);
        fs.writeFileSync("bncP2pSnap.json", JSON.stringify(bncP2pSnap))
        return bncP2pSnap
    } catch (error) {
        console.log(error);
    }
}

p2p(endpoint, path, payload)