var vows = require('vows');
var assert = require('assert');
var tolerance = 0.000001;

require('./helpers.js');

var suite = vows.describe('joptions');
suite.addBatch({
  'implied volatility': {
    'topic': function() {
      return joptions.volatility;
    },

    //Checked against RQuantLib's EuropeanOptionImpliedVolatility(type="call", value=11.10, underlying=100, strike=100, dividendYield=0, riskFreeRate=0.03, maturity=0.5, volatility=0.4)
    'call implied volatility': function(volatility) {
      var input= { S: 100, K: 100, P: 11.10, maturity: 0.5, r: 0.03 };
      assert.epsilon(tolerance, volatility.implied("c", input), 0.3703024896);
    },

    //Checked against RQuantLib's EuropeanOptionImpliedVolatility(type="put", value=11.10, underlying=100, strike=100, dividendYield=0, riskFreeRate=0.03, maturity=0.5, volatility=0.4)
    'put implied volatility': function(volatility) {
      var input= { S: 100, K: 100, P: 11.10, maturity: 0.5, r: 0.03 };
      assert.epsilon(tolerance, volatility.implied("p", input), 0.4240814121);
    }    

  }
});

suite.export(module);