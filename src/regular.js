module.exports = function(joptions) {

	var cdf = joptions.cdf;
	var d1 = joptions.d1;
	var d2 = joptions.d2;

	joptions.regular = {
		
		//	Regular option price calculation via Black-Scholes model.
		//
		// 	input - {
		//		type: "c" for calls, "p" for puts
		//		S: spot price of the underlying security,
		//		X: strike price,
		//		T: time to maturity,
		//		r: risk free interest rate,
		//		volatility: volatility of the underlying security
		// 	}		
		price: function(option) {
			var underlyingPrice = expectedUnderlyingPrice(option);
			var payoff = expectedPayoff(option);
			
			return underlyingPrice - discount(option)*payoff;
		}

	};	

	var expectedUnderlyingPrice = function(option) {
		var sign = joptions.sign(option.type);
		return sign * option.S * cdf( sign*d1(option) );
	};	

	var expectedPayoff = function(option)  {
		var sign = joptions.sign(option.type);
		return sign * option.X * cdf( sign*d2(option) );
	}

	var discount = function(option) 	{
		return Math.exp(-option.r*option.T);
	};
}