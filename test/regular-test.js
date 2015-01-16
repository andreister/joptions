var vows = require('vows');
var assert = require('assert');
var tolerance = 0.0001;

require('./helpers.js');

var suite = vows.describe('joptions');
suite.addBatch({
  'regular options': {
    'topic': function() {
      return joptions.regular;
    },

    //Checked against RQuantLib's EuropeanOption('c', 100, 80, 0, 0.06, 9/12, 0.35)
    'call price': function(regular) {
      var option = { type: 'c', S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
      assert.epsilon(tolerance, regular.price(option), 26.2391);
    },

    //Checked against RQuantLib's EuropeanOption('c', 100, 80, 0, 0.06, 9/12, 0.35)
    'put price': function(regular) {
      var option = { type: 'p', S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
      assert.epsilon(tolerance, regular.price(option), 2.7189);
    }
  }
});

suite.export(module);