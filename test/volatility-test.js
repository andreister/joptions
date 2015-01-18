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
      var option = { type: 'c', S: 100, X: 100, P: 11.10, T: 0.5, r: 0.03 };
      assert.epsilon(tolerance, volatility.implied(option), 0.3703024896);
    },

    //Checked against RQuantLib's EuropeanOptionImpliedVolatility(type="put", value=11.10, underlying=100, strike=100, dividendYield=0, riskFreeRate=0.03, maturity=0.5, volatility=0.4)
    'put implied volatility': function(volatility) {
      var option = { type: 'p', S: 100, X: 100, P: 11.10, T: 0.5, r: 0.03 };
      assert.epsilon(tolerance, volatility.implied(option), 0.4240814121);
    },

    'estimated volatility': function(volatility) {
      var returns = [0.5, -0.2, 0.03, -0.01, -0.4, 0.1, 0.06];
      assert.epsilon(tolerance, volatility.estimated(returns), 0.2779945);
    }    

  }
});

suite.export(module);