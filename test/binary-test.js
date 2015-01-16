var vows = require('vows');
var assert = require('assert');
var tolerance = 0.000001;

require('./helpers.js');

var suite = vows.describe('joptions');
suite.addBatch({
  'binary options': {
    'topic': function() {
      return joptions.binary;
    },

    //Checked against fExoticOption's CashOrNothingOption(TypeFlag="c", S=100, X=80, K=1, Time=9/12, r=0.06, b=0, sigma=0.35)
    'call price': function(binary) {
      var option = { type: 'c', S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
      assert.epsilon(tolerance, binary.price(option), 0.7344434);
    },

    //Checked against fExoticOption's CashOrNothingOption(TypeFlag="p", S=100, X=80, K=1, Time=9/12, r=0.06, b=0, sigma=0.35)
    'put price': function(binary) {
      var option = { type: 'p', S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
      assert.epsilon(tolerance, binary.price(option), 0.2215541);
    }
  }
});

suite.export(module);