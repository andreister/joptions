module.exports = function(joptions) {

	var cdf = joptions.util.cdf;
	var d1 = joptions.util.d1;
	var d2 = joptions.util.d2;	

	joptions.currency = {
		
		//	Currency option price calculation via Garman-Kohlhagen model.
		//
		// 	input - {
		//		type: "c" for calls, "p" for puts
		//		S: spot price of the foreign currency,
		//		X: strike price,
		//		maturity: time to maturity,
		//		r: risk free interest rate,
		//		rf: foreign risk free interest rate,
		//		volatility: volatility of the returns on the foreign currency 
		// 	}
		price: function(option) {
			var noInterestOption = joptions.util.clone(option, function(x) { x.r = option.r - option.rf});

			var underlyingPrice = expectedUnderlyingPrice(option.S, noInterestOption);
			var payoff = expectedPayoff(option.X, noInterestOption);
			
			return discountF(option)*underlyingPrice - discount(option)*payoff;
		}

	};

	var expectedUnderlyingPrice = function(S, option) {
		var sign = joptions.util.sign(option.type);
		return sign * S * cdf( sign * d1(option) );
	};

	var expectedPayoff = function(X, option) {
		var sign = joptions.util.sign(option.type);
		return sign * X * cdf( sign * d2(option) );
	};

	var discount = function(option) {
		return Math.exp(-option.r*option.T);
	};

	var discountF = function(option) {
		return Math.exp(-option.rf*option.T);
	};
}