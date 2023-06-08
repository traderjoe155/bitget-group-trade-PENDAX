import {createExchange} from "@compendiumfi/pendax/exchanges/exchange.js"

let bitget_exchange = createExchange({
    exchange: "bitget",
    key: "",
    secret: "",
    passphrase: "",
    authenticate: true,
    label: "bitget1",
  });
  let bitget_exchange2 = createExchange({
    exchange: "bitget",
    key: "",
    secret: "",
    passphrase: "",
    authenticate: true,
    label: "bitget2",
  });
  let bitget_exchange3 = createExchange({
    exchange: "bitget",
    key: "",
    secret: "",
    passphrase: "",
    authenticate: true,
    label: "bitget3",
  });

  let risk = .5;
  let exchangeList = [bitget_exchange, bitget_exchange2, bitget_exchange3]
  let market = 'BTCUSDT_UMCBL';
  let side = 'open_long';
  let orderType = 'market';


async function main(exchangeList) {
    for (let i = 0; i < exchangeList.length; i++) {
        let result = await exchangeList[i].getAccountListFutures({
            productType: "umcbl"
        });
        let balance = result.data.data[0].equity;
        let tradeToPlace = balance * risk;
        let currentPrice = await exchangeList[i].getSingleTickerFutures({
            symbol: market
        });
        let size = tradeToPlace / currentPrice.data.data.last;
        size = size.toFixed(6);
        console.log(size);
        let label = exchangeList[i].exchangeType.label;
    
        console.log(label + ': balance: ' + balance + ': trade to place: ' + tradeToPlace);
        try {
            let trade = await exchangeList[i].placeOrderFutures({
                symbol: market,
                marginCoin: 'USDT',
                size: size,
                side: side,
                orderType: orderType,
                timeInForceValue: 'normal'
            });
            console.log(trade);
        } catch (error) {
            console.log(error.message);
        }
    }

}

main(exchangeList);
