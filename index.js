const dotenv = require('dotenv');

const postgres = require('postgres');

const fetch = require('node-fetch');
const crypto = require('crypto')


dotenv.config();

const apiKey = process.env.APIKEY;
const secretKey = process.env.SECRET
const endpoint = 'https://api.binance.com'
const path = '/sapi/v1/accountSnapshot'
const parameters = 'type=SPOT'

const checkResponseStatus = (res) => {
    if(res.ok){
        return res
    }
    else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`)
    }
}


const GETrequest = async (apiKey, secretKey, endpoint, path, parameters) => {
    const options = {headers: {}};
    let nonce = Date.now().toString();
    let parametersAndNonce = parameters + ((parameters != '') ? '&' : '') + 'timestamp=' + nonce ;
    let signature = crypto.createHmac('sha256', secretKey).update(parametersAndNonce).digest('hex');
    message = parametersAndNonce + '&signature=' + signature;
    options.headers['X-MBX-APIKEY'] = apiKey;
    const makeRequest = await fetch(`${endpoint}${path}?${message}`, options)
                .then(checkResponseStatus)
                .then(response => response.json())
                .then(json => console.log(json.snapshotVos[0].updateTime))
                .catch(err => console.log(err))
}

GETrequest(apiKey, secretKey, endpoint, path, parameters)