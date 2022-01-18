1. Сделать асинхронный параллельный запрос
2. Запрос SPOT позиций [ссылка на api](https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data): <https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data>

    2.1. Свободные позиции

    2.2. Позиции которые находятся в ордерах 

3. Запрос usd-m futures позиций
4. Запрос coin-m futures позиций
5. Запрос cross margin позиций
6. Запрос izolated margin позиций


# Нужные методы и api

### Parameters
|AccountType|PositionApi|OrderBookApi|OrderApi|EndPoint|
|:---:|---|:---:|---|---|
|`SPOT`|[GET /api/v3/account](https://binance-docs.github.io/apidocs/spot/en/#account-information-user_data)|[GET /api/v3/depth](https://binance-docs.github.io/apidocs/spot/en/#order-book)|[POST /api/v3/order](https://binance-docs.github.io/apidocs/spot/en/#new-order-trade)|https://api.binance.com|
|`usd-m futures`|[GET /fapi/v2/account](https://binance-docs.github.io/apidocs/futures/en/#account-information-v2-user_data)|[GET /fapi/v1/depth](https://binance-docs.github.io/apidocs/futures/en/#order-book)|[POST /fapi/v1/order](https://binance-docs.github.io/apidocs/futures/en/#new-order-trade)|https://fapi.binance.com|
|`coin-m futures`|[GET /dapi/v1/account](https://binance-docs.github.io/apidocs/delivery/en/#account-information-user_data)|[GET /dapi/v1/depth](https://binance-docs.github.io/apidocs/delivery/en/#order-book)|[POST /dapi/v1/order](https://binance-docs.github.io/apidocs/delivery/en/#new-order-trade)|https://dapi.binance.com|
|`cross margin`|[GET /sapi/v1/margin/account](https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-account-details-user_data)|OrderBookApi|OrderApi|https://api.binance.com|
|`isolated margin`|PositionApi|OrderBookApi|OrderApi|EndPoint|