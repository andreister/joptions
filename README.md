# joptions
JavaScript library for Options valuation

* Regular call and put prices
* Binary call and put prices
* Greeks
* Implied volatility

```
var input= { S: 75, K: 90, maturity: 0.8, r: 0.02, volatility: 0.2 };

var callPrice = joptions.regular.call(input);
var putPrice = joptions.regular.put(input);

var binaryCallPrice = joptions.binary.call(input);
var binaryPutPrice = joptions.binary.put(input);

var gamma = joptions.greeks.gamma(input);
var vega = joptions.greeks.vega(input);

var impliedVolatility = joptions.volatility.implied(input);
```

