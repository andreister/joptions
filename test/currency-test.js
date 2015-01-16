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
      var option = { type: 'c', S: 1.56, X: 1.6, T: 0.5, r: 0.06, rf: 0.08, volatility: 0.12 };
      assert.epsilon(tolerance, currency.price(option), 0.02909930989);
    },

    //Checked against fOption's GBSOption(TypeFlag = "p", S = 1.5600, X = 1.6000, Time = 1/2, r = 0.06, b = 0.06-0.08, sigma = 0.12)
    'put price': function(currency) {
      var option = { type: 'p', S: 1.56, X: 1.6, T: 0.5, r: 0.06, rf: 0.08, volatility: 0.12 };
      assert.epsilon(tolerance, currency.price(option), 0.08298063849);
    },
  }
});

suite.export(module);