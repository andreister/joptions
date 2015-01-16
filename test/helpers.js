//hack to make joptions available for tests

joptions = require('../src/core.js').joptions;
require('../src/regular.js')(joptions);
require('../src/binary.js')(joptions);
require('../src/greeks.js')(joptions);
require('../src/volatility.js')(joptions);
require('../src/currency.js')(joptions);


