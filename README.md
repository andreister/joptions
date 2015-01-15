# joptions
JavaScript library for Options valuation

```
var input= { S: 75, K: 90, maturity: 0.8, r: 0.02, volatility: 0.2 };
var callPrice = joptions.binary.call(input);
```

```
var input= { S: 100, K: 80, maturity: 9/12, r: 0.06, volatility: 0.35 };
var gamma = joptions.greeks.gamma(input);
```

