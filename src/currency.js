module.exports = function(joptions) {

	var cdf = joptions.cdf;
	var d1 = joptions.d1;
	var d2 = joptions.d2;

	var clone = function(x, update) {
		var result = JSON.parse(JSON.stringify(x));
		update(result);
		return result;
	};
	
	//	Currency option price calculation via Garman-Kohlhagen model.
	//
	//	type - "p" for put, "c" for call
	// 	input - {
	//		S: spot price of the foreign currency,
	//		K: strike price,
	//		maturity: time to maturity,
	//		r: local risk free interest rate,
	//		rf: foreign risk free interest rate,
	//		variance: variance of the returns on the foreign currency 
	// 	}
	var price = function(type, input) {
		var sign = { "p": -1, "c": 1 }[type];

		var discountForeign = Math.exp( -input.rf*input.maturity );
		var discountDomestic = Math.exp( -input.r*input.maturity);

		var option = clone(input, function(x) { x.r = input.r - input.rf});
		var expectedSpotPrice = sign*input.S*cdf( sign*d1(option) );
		var expectedPayoff = sign*input.K*cdf( sign*d2(option) ); 
		
		return discountForeign*expectedSpotPrice - discountDomestic*expectedPayoff;
	};	

	joptions.currency = {
		
		call: function(input) {
			return price("c", input);
		},

		put: function(input) {
			return price("p", input);
		}

	};

}