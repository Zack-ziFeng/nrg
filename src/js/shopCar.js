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
    let goods = JSON.parse(Cookie.get('shopCar'));
    let arr = [];
    goods.forEach(function(item) {
    	arr.push(item.id);
    });
    $.ajax({
    	type: 'GET',
		url: '../api/shopCar.php',
		async: true,
		data: {
			'idxArr': JSON.stringify(arr)
		},
		success: function(str) {
			JSON.parse(str).forEach(function(item, idx) {
				new Shop(item, goods[idx].num);
			});
			$('.allGoods').click(function() {
				if ($(this).is(':checked')) {
					$('.car tbody .check').find('input').prop('checked', true);
				} else {
					$('.car tbody .check').find('input').prop('checked', false);
				}
			});

			$(document).click(function() {
				if ($('.car tbody .check').find('input').length === $('.car tbody .check input:checked').length) {
					$('.allGoods').prop('checked', true);
				} else {
					$('.allGoods').prop('checked', false);
				}

				let sum = 0;
				let shop = $('.car tbody .check input:checked').parent().next().next().next().next().text().split('￥').slice(1);
				shop.forEach(function(item) {
					sum += item*1;
				});
				$('#sum').find('span').text(sum.toFixed(2));
			});
		}
    });

    var Shop = function(obj, number) {
    	this.loca = '.car tbody';
    	this.init(obj, number);
    }

    Shop.prototype.init = function(obj, number) {
    	this.item = $(`
				<tr id=${obj.id}>
					<td class="check"><input type="checkbox"></td>
					<td class="goods_name clearFix">
						<img src="../img/good_list/${obj.img}" alt="">
						<h3>${obj.name}</h3>
					</td>
					<td class="goods_price">${obj.new_price}</td>
					<td class="goods_num">
						<span class="sub">-</span>
						<input type="text" name="" value="${number}">
						<span class="add">+</span>
					</td>
					<td class="goods_sum">￥${(obj.new_price*1 * number*1).toFixed(2)}</td>
					<td class="goods_del"><span>删除</span></td>
				</tr>
    		`);
    	$(this.loca).append(this.item);

    	$(this.item).find('.add').click(function() {
    		let num = $(this).prev().val();
    		let one = $(this).parent().prev().text();
    		num = num*1 + 1;
    		$(this).prev().val(num);
    		$(this).parent().next().text('￥' + (one * num).toFixed(2));
    	});

    	$(this.item).find('.sub').click(function() {
    		let num = $(this).next().val();
    		let one = $(this).parent().prev().text();
    		num = num*1 - 1;
    		if (num <= 1) {num = 1;}
    		$(this).next().val(num);
    		$(this).parent().next().text('￥' + (one * num).toFixed(2));
    	});

    	$(this.item).find('.goods_num input').blur(function() {
    		let num = $(this).val();
    		let one = $(this).parent().prev().text();
    		$(this).parent().next().text('￥' + (one * num).toFixed(2));
    	});

    	$(this.item).find('.goods_del').click(function() {
    		if (confirm('是否删除')) {
    			$(this).parent().remove();
    			let id = $(this).parent().attr('id');
    			goods.forEach(function(item, idx) {
    				if (item.id === id) {
    					goods.splice(idx, 1);
    					Cookie.set('shopCar', JSON.stringify(goods), {path: '/'});
    				}
    			});
    		}
    	});
    }
});