module.exports = function(joptions) {

	var d2 = function(input) {
		var numerator = Math.log(input.strike/input.exercise) + (input.r - Math.pow(input.volatility,2) / 2) * input.maturity;
		var denominator = input.volatility*Math.sqrt(input.maturity);      	

		return numerator/denominator;
	}

	var price = function(type, input) {
		//	type - "p" for put, "c" for call
		// 	input - {
		//		strike: strike price,
		//		exercise: exercise price,
		//		maturity: time to maturity,
		//		r: risk free interest rate,
		//		volatility: volatility of the underlying security
		// 	}
		
		var sign = { "p": -1, "c": 1 }[type];
		var expectedPayoff = joptions.jStat.normal.cdf( sign*d2(input), 0, 1);

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