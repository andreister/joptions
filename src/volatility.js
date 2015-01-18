module.exports = function(joptions) {

	var d1 = joptions.d1;
	var price = joptions.regular.price;
	var vega = joptions.greeks.vega;	

	joptions.volatility = {
		
		implied: function(option) {
			return volatility(option);
		},

		estimated: function(returns) {
			return deviation(returns);
		}

	};

	//	Implied volatility calculation via Newton-Raphson method.
	//
	// 	input - {
	//		type: "c" for calls, "p" for puts		
	//		S: spot price of the underlying security,
	//		X: strike price,
	//		P: price of the option,
	//		T: time to maturity,
	//		r: risk free interest rate
	// 	}
	var volatility = function(option) {

		var ITERATIONS = 1000;
		var ACCURACY = 0.0001

		option.volatility = (option.P/option.S) * (2.5/Math.sqrt(option.T));		//initial guess via Brenner and Subrahmanyam (1988)
		
		for (var i = 0; i < ITERATIONS; i++) {
  			var diff = option.P - price(option);
  			if (Math.abs(diff) < ACCURACY) {
  				return option.volatility;
  			}
  			option.volatility += diff/vega(option);
  		}

  		console.error("joptions.implied.volatility(): failed to converge");
		return 0;
	};

	//	Volatility estimate via returns standard deviation.
	//
	// 	returns - array or numbers
	var deviation = function(returns) {
		return joptions.stdev(returns);
	};


}