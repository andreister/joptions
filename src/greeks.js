module.exports = function(joptions) {

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

}