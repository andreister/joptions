this.joptions = (function(undefined) {

	var jStat = require("./jstat.js").jStat;

	// Black-Scholes generic function for d1 and d2
	var d = function(sign, input) {
		var multiplier = {"+": 1, "-": -1}[sign];
		var drift = (input.r + multiplier * Math.pow(input.volatility,2) / 2);
		var factor = 1/(input.volatility*Math.sqrt(input.maturity));      	
		
		return factor * ( Math.log(input.S/input.K)  +  drift * input.maturity );
	};

	return {
		version:  function () {
			return "0.0.1";
		},
		d1: function(input) {
			return d("+", input);
		},
		d2: function(input) {
			return d("-", input);
		},
		cdf: function(value) {
			return jStat.normal.cdf(value, 0, 1);
		},
		pdf: function(value) {
			return jStat.normal.pdf(value, 0, 1);
		},

		sign: function(optionType) 		{
			return { "p": -1, "c": 1 }[optionType];
		},
		clone: function(x, update) {
			var result = JSON.parse(JSON.stringify(x));
			update(result);
			return result;
		}
	};

}());