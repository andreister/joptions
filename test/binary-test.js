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
    //try RQuantLib?
    'call price': function(binary) {
      var input= { strike: 100, exercise: 80, maturity: 9/12, r: 0.06, volatility: 0.35 };
      assert.epsilon(tolerance, binary.call(input), 0.7344434);
    },

    //Checked against fExoticOption's CashOrNothingOption(TypeFlag="p", S=100, X=80, K=1, Time=9/12, r=0.06, b=0, sigma=0.35)
    //try RQuantLib?
    'put price': function(binary) {
      var input= { strike: 100, exercise: 80, maturity: 9/12, r: 0.06, volatility: 0.35 };
      assert.epsilon(tolerance, binary.put(input), 0.2215541);
    }
  }
});

suite.export(module);