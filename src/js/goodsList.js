$(function() {
	$.ajax({
		type: 'GET',
		url: '../api/get_goods.php',
		async: true,
		data: {
			'page': 1
		},
		success: function(str) {
			console.log(JSON.parse(str))
		},
		contentType: "application/x-www-form-urlencoded; charset=utf-8"
	});
});