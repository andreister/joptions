var vows = require('vows');
var assert = require('assert');

require('./helpers.js');

var suite = vows.describe('joptions');
suite.addBatch({
  'currency options': {
    'topic': function() {
      return joptions.currency;
    },

    'call price': function(currency) {
      assert.fail("not implemented");
    },

    'put price': function(currency) {
      assert.fail("not implemented");
    },
  }
});

suite.export(module);