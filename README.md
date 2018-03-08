# Crypto Trading Tool Collection

This is just a collection of tools that might be helpful to crypto traders using Coinigy.

Currently it consists only of a consolidated(average) price tool but I will add more features soon.

![Preview](https://i.imgur.com/Bhbog7P.png)

## Installation

First install NodeJS:
> **NodeJS:** [https://nodejs.org/en/](https://nodejs.org/en/) - **Use Current**

Download this package either as a zip (above) or via Git.

Open terminal in package location. ( Win 10 - Shift Right Click in Explorer, Open in PowerShell )

> **Install:** npm install

## Configuration

Browse to the config folder in the package. Modify 'exchanges.config.js' file to your liking:

    {
     name:  'Bitfinex',      // Exchange Nickname
     ticker:  'BITF',        // Coinigy Exchange Ticker
     base:  'USD',           // Base Currency
     assetTicker:  'BTC',    // Asset Ticker ( BTC, XBT )
     show: true,             // Show on output screen
     inverted: false,        // Fix for certain exchanges that use USD/BTC instead of BTC/USD
     enabled: true,          // Collect data or not?
     includeInAverage: true, // Include  in average ( Show Korea but exclude from average )
    },

Generate an API key on Coinigy.

Create a ***.env*** file in the root directory:

    API_KEY=xxxxx-yyyyy-zzzzz
    API_SECRET=xxxxx-yyyyy-zzzzz

## Running

Open terminal in package location. ( Win 10 - Shift Right Click in Explorer, Open in PowerShell )

> **How to run:** npm run dev-watch

## Donations

If you find any of my tools helpful feel free to donate:

**BTC:** 1Es1nLzBzwMn6nu8Dng3LPp4vfEa8s4mK2

**LTC:** LYH8VQSek33Axa6Zn2MsngR2Y2Lf7mJXpF

**ETH:** 0xcd2c6e708d7696e403f3be5ca6e5d5519ffbeb1b

**XMR:** 48pRFKSLchCLmZWHvWRHc6hJYX8C8Bc7MZfut3S7CtgvRfRetm52W5c9fnt93spKmeTXaT2AwBc3GDUr9QdcYZmtQ76VLaQ
