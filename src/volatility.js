module.exports = function(joptions) {

	var d1 = joptions.d1;
	var price = joptions.regular.price;
	var vega = joptions.greeks.vega;	

	joptions.volatility = {
		
		implied: function(type, input) {
			return volatility(type, input);
		}

	};

	//	Implied volatility calculation via Newton-Raphson method.
	//
	//	type - "p" for put, "c" for call
	// 	input - {
	//		S: spot price of the underlying security,
	//		K: strike price,
	//		P: price of the option,
	//		maturity: time to maturity,
	//		r: risk free interest rate
	// 	}
	var volatility = function(type, input) {

		var ITERATIONS = 1000;
		var ACCURACY = 0.0001

		var i = 0;
		var option = joptions.clone(input, function(x) {
			x.volatility = (input.P/input.S) / (0.398*Math.sqrt(input.maturity))		//initial guess
		});

		for (i = 0; i < ITERATIONS; i++) {

  			var diff = input.P - price(type, option);
  			if (Math.abs(diff) < ACCURACY) {
  				return option.volatility;
  			}
  			option.volatility += diff/vega(option);
  		}

  		console.error("joptions.volatility.implied(): failed to converge")
		return 0;
	}


}