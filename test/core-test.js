var vows = require('vows');
var assert = require('assert');

require('./helpers.js');

var suite = vows.describe('joptions');
suite.addBatch({
  'core': {
    'topic': function() {
      return joptions;
    },

    'version': function(joptions) {
      assert.equal(joptions.version(), "0.0.2");
    }
  }
});

suite.export(module);