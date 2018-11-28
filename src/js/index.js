$(function() {
	 $('#banner').myscroll({
        picEl: $('#move'), //图片父级，不传默认为banner内第1个div
        ctrlEl: $('#ctrl'), //控制条父级，包括小圆点和左右箭头，不传默认为banner内第2个div
        libs: false, //是否创建底部小圆点，true || false,不传默认true
        arrows: true, //是否创建左右箭头，true || false,不传默认true
        autoPlay: true, //是否自动播放，true || false,不传默认true
        time: 4000, //自动播放间隔时间，true || false,不传默认2000
        speed: 400, //图片切换速度，不传默认400
        effect: 'fade' //轮播的改变方式 top || left || fade，不传默认left
    });
});