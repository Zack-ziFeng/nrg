$(function() {

	$('#add').click(function() {
		let num = $('#num').val()*1;
		num++;
		$('#num').val(num);
	});

	$('#sub').click(function() {
		let num = $('#num').val()*1;
		num--;
		if (num <= 1) {
			num = 1;
		}
		$('#num').val(num);
	});

	$('.goods_size').find('li').click(function() {
		$('.goods_size li').attr('class', '');
		$(this).attr('class', 'active');
	});

	$('.goods_color').find('li').click(function() {
		$('.goods_color li').attr('class', '');
		$(this).attr('class', 'active');
	});

	$('.place_search').click(function() {
		$('.place_list').css('display', 'block');
	});

	$('.place_list').find('li').click(function() {
		$('.place_search').html($(this).text() + `<span class="iconfont">&#xe6bb;</span>`);
		$('.place_list').css('display', 'none');
	});

	$('.pic').find('li').mouseover(function() {
		let url = $(this).children('img').attr('src');
		$('.bicPic').attr('src', url);
		$('.pic li img').attr('class', '');
		$(this).children('img').attr('class', 'active');
	});

	
});