module.exports = function(joptions) {

	var cdf = joptions.cdf;
	var pdf = joptions.pdf;
	var d1 = joptions.d1;

	joptions.greeks = {

		delta: function(type, input) {
			var sign = { "p": -1, "c": 1 }[type];
			return sign*cdf( sign*d1(input) );
		},

		gamma: function(input) {
			var factor = input.S * input.volatility * Math.sqrt(input.maturity);
			return pdf( d1(input) ) / factor;
		}

	};

}