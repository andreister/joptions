var vows = require('vows');
var assert = require('assert');
var tolerance = 0.0001;

require('./helpers.js');

var suite = vows.describe('joptions');
suite.addBatch({
  'greeks': {
    'topic': function() {
      return joptions.greeks;
    },

    //Checked against RQuantLib's EuropeanOption('c', 100, 80, 0, 0.06, 9/12, 0.35)
	'call delta': function(greeks) {
		var option = { type: 'c', S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
		assert.epsilon(tolerance, greeks.delta(option), 0.8499);
	},

	//Checked against RQuantLib's EuropeanOption('p', 100, 80, 0, 0.06, 9/12, 0.35)
	'put delta': function(greeks) {
		var option = { type: 'p', S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
		assert.epsilon(tolerance, greeks.delta(option), -0.1501);
	},

    //Checked against RQuantLib's EuropeanOption('c', 100, 80, 0, 0.06, 9/12, 0.35)
	'gamma': function(greeks) {
		var option = { S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
		assert.epsilon(tolerance, greeks.gamma(option), 0.0077);
	},

	//Checked against RQuantLib's EuropeanOption('c', 100, 80, 0, 0.06, 9/12, 0.35)
	'vega': function(greeks) {
		var option = { S: 100, X: 80, T: 9/12, r: 0.06, volatility: 0.35 };
		assert.epsilon(tolerance, greeks.vega(option), 20.1971);
	}
  }
});

suite.export(module);