require.config({
	paths: {
		'jquery':'../lib/jquery-3.3.1.min.js'
	}
});

require('jquery', function($){
	console.log($);
});