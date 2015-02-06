//....................................................
//
//			[joptions include] core
//
//....................................................
this.joptions = (function() {

	return {
		version:  function () {
			return "0.0.2";
		}
	};

}());

//....................................................
//
//			[joptions include] util
//
//....................................................
(function(joptions) {

	// Black-Scholes generic function for d1 and d2
	var d = function(sign, option) {
		var multiplier = {"+": 1, "-": -1}[sign];

		var drift = option.r + multiplier * option.volatility*option.volatility/2;
		var factor = 1/(option.volatility*Math.sqrt(option.T));      	
		
		return factor * ( Math.log(option.S/option.X)  +  drift * option.T );
	};

	joptions.util = {
		
		d1: function(option) {
			return d("+", option);
		},
		d2: function(option) {
			return d("-", option);
		},
		cdf: function(value) {
			return jStat.normal.cdf(value, 0, 1);
		},
		pdf: function(value) {
			return jStat.normal.pdf(value, 0, 1);
		},
		stdev: function(list) {
			return jStat.stdev(list, true);
		},

		sign: function(optionType) 		{
			return { "p": -1, "c": 1 }[optionType];
		},
		clone: function(x, modify) {
			var result = JSON.parse(JSON.stringify(x));
			modify(result);
			return result;
		}

	};

})(this.joptions);

//....................................................
//
//			[joptions include] regular
//
//....................................................
(function(joptions) {

	var cdf = joptions.util.cdf;
	var d1 = joptions.util.d1;
	var d2 = joptions.util.d2;

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
		var sign = joptions.util.sign(option.type);
		return sign * option.S * cdf( sign*d1(option) );
	};	

	var expectedPayoff = function(option)  {
		var sign = joptions.util.sign(option.type);
		return sign * option.X * cdf( sign*d2(option) );
	}

	var discount = function(option) 	{
		return Math.exp(-option.r*option.T);
	};

})(this.joptions);

//....................................................
//
//			[joptions include] binary
//
//....................................................
(function(joptions) {

	var cdf = joptions.cdf;
	var d2 = joptions.d2;	

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
		var sign = joptions.sign(option.type);
		return cdf( sign*d2(option) );
	}

	var discount = function(option) 	{
		return Math.exp(-option.r*option.T);
	};

})(this.joptions);

//....................................................
//
//			[joptions include] greeks
//
//....................................................
(function(joptions) {

	var cdf = joptions.util.cdf;
	var pdf = joptions.util.pdf;
	var d1 = joptions.util.d1;

	joptions.greeks = {

		delta: function(option) {
			var sign = joptions.util.sign(option.type);
			return sign*cdf( sign*d1(option) );
		},

		gamma: function(option) {
			var factor = option.S * option.volatility * Math.sqrt(option.T);
			return pdf( d1(option) ) / factor;
		},

		vega: function(option) {
			return option.S * pdf( d1(option) ) * Math.sqrt(option.T);
		}

	};

})(this.joptions);

//....................................................
//
//			[joptions include] volatility
//
//....................................................
(function(joptions) {

	var d1 = joptions.util.d1;
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
		return joptions.util.stdev(returns);
	};

})(this.joptions);

//....................................................
//
//			[joptions include] currency
//
//....................................................
(function(joptions) {

	var cdf = joptions.cdf;
	var d1 = joptions.d1;
	var d2 = joptions.d2;	

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
			var noInterestOption = joptions.clone(option, function(x) { x.r = option.r - option.rf});

			var underlyingPrice = expectedUnderlyingPrice(option.S, noInterestOption);
			var payoff = expectedPayoff(option.X, noInterestOption);
			
			return discountF(option)*underlyingPrice - discount(option)*payoff;
		}

	};

	var expectedUnderlyingPrice = function(S, option) {
		var sign = joptions.sign(option.type);
		return sign * S * cdf( sign * d1(option) );
	};

	var expectedPayoff = function(X, option) {
		var sign = joptions.sign(option.type);
		return sign * X * cdf( sign * d2(option) );
	};

	var discount = function(option) {
		return Math.exp(-option.r*option.T);
	};

	var discountF = function(option) {
		return Math.exp(-option.rf*option.T);
	};
	
})(this.joptions);