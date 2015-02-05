module.exports = function(joptions) {

	var jStat = require("./jstat.js").jStat;

	// Black-Scholes generic function for d1 and d2
	var d = function(sign, option) {
		var multiplier = {"+": 1, "-": -1}[sign];

		var drift = option.r + multiplier * option.volatility*option.volatility/2;
		var factor = 1/(option.volatility*Math.sqrt(option.T));      	
		
		return factor * ( Math.log(option.S/option.X)  +  drift * option.T );
	};

	joptions.util = {
		
		d1: function(option) {
			return d("+", option);
		},
		d2: function(option) {
			return d("-", option);
		},
		cdf: function(value) {
			return jStat.normal.cdf(value, 0, 1);
		},
		pdf: function(value) {
			return jStat.normal.pdf(value, 0, 1);
		},
		stdev: function(list) {
			return jStat.stdev(list, true);
		},

		sign: function(optionType) 		{
			return { "p": -1, "c": 1 }[optionType];
		},
		clone: function(x, modify) {
			var result = JSON.parse(JSON.stringify(x));
			modify(result);
			return result;
		}

	};

}