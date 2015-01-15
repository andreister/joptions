# joptions
JavaScript library for Options valuation

```
var input= { S: 75, K: 90, maturity: 0.8, r: 0.02, volatility: 0.2 };

var callPrice = joptions.binary.call(input);
var putPrice = joptions.binary.put(input);
var gamma = joptions.greeks.gamma(input);
```

