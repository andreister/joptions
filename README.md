# joptions
JavaScript library for Options valuation

* Call and put prices for 
  * regular options
  * binary options
  * currency options
* Greeks
* Implied volatility

```
var option = { type: 'c', S: 75, X: 90, T: 0.8, r: 0.02, volatility: 0.2 };
var callPrice = joptions.regular.price(option);
```

```
var option = { type: 'p', S: 175, X: 90, T: 0.5, r: 0.02, volatility: 0.35 };
var putPrice = joptions.binary.price(option);
```

```
var option = { type: 'c', S: 1.56, X: 1.6, T: 0.5, r: 0.06, rf: 0.08, volatility: 0.12 };
var callPrice = joptions.currency.price(option);
```

```
var option = { S: 75, X: 90, T: 0.8, r: 0.02, volatility: 0.2 };
var gamma = joptions.greeks.gamma(option);
var vega = joptions.greeks.vega(option);
```

```
var option = { type: 'p', S: 100, X: 95, P: 11.10, T: 0.5, r: 0.03 };
var impliedVolatility = joptions.volatility.implied(option);
```

