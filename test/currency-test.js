var vows = require('vows');
var assert = require('assert');
var tolerance = 0.000001;

require('./helpers.js');

var suite = vows.describe('joptions');
suite.addBatch({
  'currency options': {
    'topic': function() {
      return joptions.currency;
    },

    //Checked against fOption's GBSOption(TypeFlag = "c", S = 1.5600, X = 1.6000, Time = 1/2, r = 0.06, b = 0.06-0.08, sigma = 0.12)
    'call price': function(currency) {
      var input= { S: 1.56, K: 1.6, maturity: 0.5, r: 0.06, rf: 0.08, volatility: 0.12 };
      assert.epsilon(tolerance, currency.call(input), 0.02909930989);
    },

    //Checked against fOption's GBSOption(TypeFlag = "p", S = 1.5600, X = 1.6000, Time = 1/2, r = 0.06, b = 0.06-0.08, sigma = 0.12)
    'put price': function(currency) {
      var input= { S: 1.56, K: 1.6, maturity: 0.5, r: 0.06, rf: 0.08, volatility: 0.12 };
      assert.epsilon(tolerance, currency.put(input), 0.08298063849);
    },
  }
});

suite.export(module);