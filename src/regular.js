module.exports = function(joptions) {

	var cdf = joptions.cdf;
	var d1 = joptions.d1;
	var d2 = joptions.d2;

	joptions.regular = {
		
		call: function(input) {
			return price("c", input);
		},

		put: function(input) {
			return price("p", input);
		},

		price: function(type, input) {
			return price(type, input);
		}

	};	

	//	Regular option price calculation via Black-Scholes model.
	//
	//	type - "p" for put, "c" for call
	// 	input - {
	//		S: spot price of the underlying security,
	//		K: strike price,
	//		maturity: time to maturity,
	//		r: risk free interest rate,
	//		volatility: volatility of the underlying security
	// 	}
	var price = function(type, input) {
		var sign = joptions.sign(type);

		var expectedSpotPrice = sign * input.S * cdf( sign*d1(input) );
		var expectedPayoff = sign * input.K * cdf( sign*d2(input) );
		var discount = Math.exp(-input.r*input.maturity);

		return expectedSpotPrice - discount*expectedPayoff;
	};

}