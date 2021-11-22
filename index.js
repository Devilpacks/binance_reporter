const dotenv = require('dotenv');
const crypto = require('crypto')

const postgres = require('postgres');
const fetch = require('node-fetch');


dotenv.config();

const api = process.env.API;
const secret = process.env.SECRET
console.log();
const endpoint = 'https://api.binance.com'
const path = '/sapi/v1/accountSnapshot'

const request = async (api, secret, endpoint, path) => {
    const options = {headers: {}};
    let nonce = Date.now().toString();
    let dataAndNonce = 'type=SPOT&' + 'timestamp=' + nonce ;
    let signature = crypto.createHmac('sha256', secret).update(dataAndNonce).digest('hex');
    message = dataAndNonce + '&signature=' + signature;
    options.headers['X-MBX-APIKEY'] = api;
    const makeRequest = await fetch(`${endpoint}${path}?${message}`, options)
                .then(response => response.json())
                .then(json => console.log(json.snapshotVos[0].updateTime))
}

request(api, secret, endpoint, path)