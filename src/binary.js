module.exports = function(joptions) {

	var cdf = joptions.util.cdf;
	var d2 = joptions.util.d2;	

	joptions.binary = {

		//	Binary option price calculation.
		//
		//	option - {
		//		type: "c" for calls, "p" for puts
		//		S: spot price of the underlying security,
		//		X: strike price,
		//		T: time to maturity,
		//		r: risk free interest rate,
		//		volatility: volatility of the underlying security
		// 	}
		price: function(option) {
			var payoff = expectedPayoff(option);
			return discount(option) * payoff;
		}

	};

	var expectedPayoff = function(option)  {
		var sign = joptions.util.sign(option.type);
		return cdf( sign*d2(option) );
	}

	var discount = function(option) 	{
		return Math.exp(-option.r*option.T);
	};

}