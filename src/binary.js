module.exports = function(joptions) {

	//	Option price calculation.
	//	type - "p" for put, "c" for call
	// 	input - {
	//		S: spot price of the underlying security,
	//		K: strike price,
	//		maturity: time to maturity,
	//		r: risk free interest rate,
	//		volatility: volatility of the underlying security
	// 	}
	var price = function(type, input) {
		var sign = { "p": -1, "c": 1 }[type];
		var expectedPayoff = joptions.jStat.normal.cdf( sign*joptions.d2(input), 0, 1);

		var discount = Math.exp(-input.r*input.maturity);

		return discount*expectedPayoff;
	}

	joptions.binary = {
		
		call: function(input) {
			return price("c", input);
		},

		put: function(input) {
			return price("p", input);
		}

	};

}