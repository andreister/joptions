var jStat = require("./jstat.js").jStat;

this.joptions = (function(undefined) {

	var version = function () {
		return "0.0.1";
	};

	return {
		version:  version,
		jStat: jStat
	};

}());