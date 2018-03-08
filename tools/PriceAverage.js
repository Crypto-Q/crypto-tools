import axios from 'axios';
import sc from 'socketcluster-client';
import fx from 'money';

import apiConfig from '../config/api.config';
import config from '../config/PriceAverage.config.json';
import exchanges from '../config/exchanges.config';

class PriceAverage {
  constructor() {
    // this.term = terminal.terminal
    this.apiConfig = apiConfig;
    this.apiChannels = {};
    this.baseCurrency = config.baseCurrency;
    this.foreignCurrencies = config.foreignCurrencies;
    this.exchangeRates = [];
    this.exchanges = exchanges;
    this.prices = {};
  }

  async getExchangeRates() {
    this.exchangeRates = await axios.get(`https://api.fixer.io/latest?base=${this.baseCurrency}&symbols=${this.foreignCurrencies}`);
    this.exchangeRates = this.exchangeRates.data.rates;
    fx.base = this.base;
    fx.rates = this.exchangeRates;
    fx.rates.USD = 1;
  }

  async connectApi() {
    this.socket = await sc.connect(this.apiConfig.options);
    await this.socket.emit('auth', this.apiConfig.creds);
    this.socket.on('error', err => console.log(err));
    this.socket.on('authenticate', () => this.streamData());
  }

  streamData() {
    this.exchanges
      .filter(_exchange => _exchange.enabled === true)
      .map((exchange) => {
        const x = this.exchanges.filter(_exchange => _exchange.name === exchange.name)[0];

        if (exchange.inverted === false) {
          this.apiChannels[exchange] = this.socket.subscribe(`TRADE-${exchange.ticker}--${exchange.assetTicker}--${exchange.base}`);
        } else {
          this.apiChannels[exchange] = this.socket.subscribe(`TRADE-${exchange.ticker}--${exchange.base}--${exchange.assetTicker}`);
        }

        this.apiChannels[exchange].watch((data) => {
          if (exchange.base === this.baseCurrency || exchange.base === `${this.baseCurrency}T`) {
            x.price = data.price;
          } else {
            x.price = fx.convert(data.price, { from: x.base, to: this.baseCurrency });
          }
          this.calcAverage();
        });
      });
  }

  calcAverage() {
    this.liveExchanges = this.exchanges.filter(_exchange =>
      _exchange.price &&
      _exchange.enabled === true &&
      _exchange.includeInAverage === true);
    this.liveExchangeCount = Object.keys(this.liveExchanges).length;
    let priceSum = 0;
    Object.entries(this.liveExchanges).map((exchange) => {
      priceSum += exchange[1].price;
    });
    this.averagePrice = priceSum / this.liveExchangeCount;
    this.printOutput();
  }

  printOutput() {
    process.stdout.write('\x1B[2J\x1B[0f');

    const displayedExchanges = this.exchanges.filter(_exchange =>
      _exchange.show === true &&
      _exchange.price !== undefined);

    displayedExchanges.forEach((_exchange) => {
      console.log(`
        ${_exchange.name} price: ${_exchange.price.toFixed(2)}
    `);
    });

    console.log(`
    Bitcoin average price: ${this.averagePrice.toFixed(2)} ( from ${this.liveExchangeCount} exchanges )
    `);
    // console.log(this.exchanges)
  }

  async run() {
    await this.getExchangeRates();
    await this.connectApi();
  }
}

export default PriceAverage;
