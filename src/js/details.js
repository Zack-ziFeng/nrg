$(function() {

	//登录
	let Cookie = {
        get:function(name){
            var cookies = document.cookie;
            var res = '';
            cookies = cookies.split('; ');
            for(var i=0;i<cookies.length;i++){
                var arr = cookies[i].split('=');
                if(arr[0] === name){
                    res = arr[1];
                }
            }
            return res;
        },
        remove:function(name){
            var now = new Date();
            now.setDate(now.getDate()-1);
            this.set(name,'',{expires:now, path: '/'});
        },
        set:function(name,value,prop){
            var str = name + '=' + value;
            if(prop === undefined){
                prop = {};
            }
            if(prop.expires){
                str += ';expires=' + prop.expires.getTime();
            }
            if(prop.path){
                str +=';path=' + prop.path
            }
            if(prop.domain){
                str +=';domain=' + prop.domain
            }
            if(prop.secure){
                str += ';secure';
            }
            document.cookie = str;
        }
    }

    function checkSignIn() {
      if (Cookie.get('username') !== '') {
            $('.before').css('display', 'none');
            $('.after').css('display', 'block');
            $('.a_user').text(Cookie.get('username'));
        } else {
            $('.before').css('display', 'block');
            $('.after').css('display', 'none');
            $('.a_user').text('');
        }  
    }

    checkSignIn();

    $('.a_quit').click(function() {
        Cookie.remove('username');
        $('.before').css('display', 'block');
        $('.after').css('display', 'none');
        $('.a_user').text('');
    });

	//渲染页面
	$.ajax({
		type: 'GET',
		url: '../api/details.php',
		async: true,
		data: {
			id: location.search.slice(1).split('=')[1]
		},
		success: function(str) {
			let data = JSON.parse(str)[0];
			console.log(data)
			$('.goods_name').text(data.name).attr('title', data.name);
			
			$('.picList').find('ul').html(`
					<li class="active">
    				    <img src="../img/good_list/${data.img}" alt="">
    				</li>
    				<li>
    				    <img src="../img/good_list/${Math.floor(Math.random()*50 + 1) + '.jpg'}" alt="">
    				</li>
    				<li>
    				    <img src="../img/good_list/${Math.floor(Math.random()*50 + 1) + '.jpg'}" alt="">
    				</li>
    				<li>
    				    <img src="../img/good_list/${Math.floor(Math.random()*50 + 1) + '.jpg'}" alt="">
    				</li>
    				<li>
    				    <img src="../img/good_list/${Math.floor(Math.random()*50 + 1) + '.jpg'}" alt="">
    				</li>
				`);

			$('.pic').find('img').attr('src', `../img/good_list/${data.img}`);
			$('.bigpic').find('img').attr('src', `../img/good_list/${data.img}`);
			
			$('.pic').find('img').attr('src', `../img/good_list/${data.img}`);
			$('.bigPic').find('img').attr('src', `../img/good_list/${data.img}`);

			//放大镜
			$('.pic').mouseover(function(e) {
				$('.bigPic').css('display', 'block');
				$('.lens').css('display', 'block');
				$(this).mousemove(function(e) {
					//镜片
					let left = e.pageX - $(this).offset().left - $('.lens').width() / 2;
					let top = e.pageY - $(this).offset().top - $('.lens').height() / 2;
					if (left <= 0) {
						left = 0;
					}
					if (top <= 0) {
						top = 0;
					}
					if (left >= $('.pic').find('img').width() - $('.lens').width()) {
						left = $('.pic').find('img').width() - $('.lens').width();
					}
					if (top >= $('.pic').find('img').height() - $('.lens').height()) {
						top = $('.pic').find('img').height() - $('.lens').height();
					}
					$('.lens').css({
						'left': left + 'px',
						'top': top + 'px'
					});
					//放大图片
					let num = $('.bigPic').width() / $('.lens').width();
					let big_left = $('.lens').css('left').split('px')[0] * num;
					let big_top = $('.lens').css('top').split('px')[0] * num;
					$('.bigPic').find('img').css({
						'left': -big_left + 'px',
						'top': -big_top + 'px'
					});
				});
			}).mouseout(function() {
				$('.bigPic').css('display', 'none');
				$('.lens').css('display', 'none');
			});

			$('.picList').find('li').mouseover(function() {
				$('.picList').find('li').attr('class', '');
				$(this).attr('class', 'active');
				$('.bigPic').find('img').attr('src', $(this).find('img').attr('src'));
				$('.pic').find('img').attr('src', $(this).find('img').attr('src'));
			});

			$('#o_price').text(`￥${data.old_price}`);
			$('#n_price').text(`￥${data.new_price}`);

			let num = data.star*1;
			for (let i=0; i<num; i++) {
				$('#star').children()[i].style.color = '#EDA100';
			}
			
			if (data.color) {
				let color_arr = data.color.split(',');
				for (let i=0; i<color_arr.length; i++) {
					$li = $(`<li>${color_arr[i]}</li>`);
					$('.goods_color').find('ul').append($li);
				}
				$('.goods_color ul li:first-child').attr('class', 'active');
				$('.goods_color').find('li').click(function() {
					$('.goods_color li').attr('class', '');
					$(this).attr('class', 'active');
				});
			} else {
				$('.goods_color').css('display', 'hidden');
			}

			if (data.size) {
				let size_arr = data.size.split(',');
				for (let i=0; i<size_arr.length; i++) {
					$li = $(`<li>${size_arr[i]}</li>`);
					$('.goods_size').find('ul').append($li);
				}
				$('.goods_size ul li:first-child').attr('class', 'active');
				$('.goods_size').find('li').click(function() {
					$('.goods_size li').attr('class', '');
					$(this).attr('class', 'active');
				});
			} else {
				$('.goods_size').css('display', 'hidden');
			}
		}
	});

	//商品数量加减
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

	//位置选择
	$('.place_search').click(function() {
		$('.place_list').css('display', 'block');
	});

	$('.place_list').find('li').click(function() {
		$('.place_search').html($(this).text() + `<span class="iconfont">&#xe6bb;</span>`);
		$('.place_list').css('display', 'none');
	});

	//添加购物车
	$('#addCar').click(function() {
		let idx = location.search.slice(1).split('=')[1];
		let number = $('.input').find('input').val();
		if (!Cookie.get('shopCar')) {
			let arr = [{
				id: idx,
				num: number
			}];
			Cookie.set('shopCar', JSON.stringify(arr), {path: '/'});
		} else {
			let arr = JSON.parse(Cookie.get('shopCar'));
			let exist = true;
			arr.forEach((item)=>{
				if (item.id === idx) {
					item.num = item.num*1 + number;
					Cookie.set('shopCar', JSON.stringify(arr), {path: '/'});
					exist = false;
				}
			});
			if (exist) {
				let obj = {
					id: idx,
					num: number
				}
				arr.push(obj);
				Cookie.set('shopCar', JSON.stringify(arr), {path: '/'});
			}
		}
	});

	//立即购买
	$('#now_buy').click(()=>{
		let idx = location.search.slice(1).split('=')[1];
		let number = $('.input').find('input').val()*1;
		if (!Cookie.get('shopCar')) {
			let arr = [{
				id: idx,
				num: number
			}];
			Cookie.set('shopCar', JSON.stringify(arr), {path: '/'});
			location.href = "../html/shopCar.html";
		} else {
			let arr = JSON.parse(Cookie.get('shopCar'));
			let exist = true;
			arr.forEach((item)=>{
				if (item.id === idx) {
					item.num = item.num*1 + number;
					Cookie.set('shopCar', JSON.stringify(arr), {path: '/'});
					location.href = "../html/shopCar.html";
					exist = false;
				}
			});
			if (exist) {
				let obj = {
					id: idx,
					num: number
				}
				arr.push(obj);
				Cookie.set('shopCar', JSON.stringify(arr), {path: '/'});
				location.href = "../html/shopCar.html";
			}
		}
	});
});