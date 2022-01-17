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
|`usd-m futures`|PositionApi|OrderBookApi|OrderApi|https://fapi.binance.com|
|`coin-m futures`|PositionApi|OrderBookApi|OrderApi|https://dapi.binance.com|
|`cross margin`|[GET /sapi/v1/margin/account](https://binance-docs.github.io/apidocs/spot/en/#query-cross-margin-account-details-user_data)|OrderBookApi|OrderApi|https://api.binance.com|
|`izolated margin`|PositionApi|OrderBookApi|OrderApi|EndPoint|