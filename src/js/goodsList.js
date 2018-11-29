$(function() {
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
			this.set(name,'x',{expires:now});
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

	$.ajax({
		type: 'GET',
		url: '../api/get_goods.php',
		async: true,
		data: {
			'page': 1
		},
		success: function(str) {
			let datas = JSON.parse(str).data;
			let page = JSON.parse(str).length;
			datas.forEach(function(item, idx) {
				new CreateGoods(item, idx);
			});
		}
	});

	let CreateGoods = function(obj, idx) {
		this.loca = '.goodsList';
		this.item = '.goods';
		this.addCar = '.addCar';
		this.star = '.star';
		this.pic = '.picList';
		this.init(obj, idx);
	}

	CreateGoods.prototype.init = function(obj, idx) {
		this.goods = $(`<li class="goods" id=${obj.id}>
						<div class="goods_top">
							<a href="#"><img src="../img/good_list/${obj.img}"></a>
						</div>
						<div class="goods_bottom">
							<ul class="picList clearFix">
								<li><img src="../img/good_list/${obj.img}" alt=""></li>
								<li><img src="../img/good_list/${Math.floor(Math.random()*50 + 1) + '.jpg'}" alt=""></li>
								<li><img src="../img/good_list/${Math.floor(Math.random()*50 + 1) + '.jpg'}" alt=""></li>
								<li><img src="../img/good_list/${Math.floor(Math.random()*50 + 1) + '.jpg'}" alt=""></li>
							</ul>
							<p><a href="#">${obj.name}</a></p>
							<div class="goodsMsg clearFix">
								<strong>￥${obj.new_price}</strong>
								<span>￥${obj.old_price}</span>
								<ul class="clearFix fr star">
									<li class="iconfont">&#xe6b9;</li>
									<li class="iconfont">&#xe6b9;</li>
									<li class="iconfont">&#xe6b9;</li>
									<li class="iconfont">&#xe6b9;</li>
									<li class="iconfont">&#xe6b9;</li>
								</ul>
							</div>
							<div class="contrast clearFix"><label><input type="checkbox">加入对比</label></div>
						</div>
						<div class="addCar iconfont">&#xe608;加入购物车</div>
					</li>`);
		$(this.loca).append(this.goods);
		$(this.loca).css({
			'height': this.goods.outerHeight(true) * 9 + 'px'
		});

		let num = obj.star*1;
		for (let i=0; i<num; i++) {
			this.goods.find('.star').children()[i].style.color = '#EDA100';
		}
		this.goodsSort(idx, this.goods);
		this.picChange();
		this.addCars();
	}

	CreateGoods.prototype.picChange = function() {
		let $bigPic = $(this.bigPic);
		$(this.pic).find('li').mouseover(function() {
			$(this).parent().parent().prev().children().children().attr('src', $(this).children('img').attr('src'));
		});
	}

	CreateGoods.prototype.goodsSort = function(idx, item) {
		item.css({
			'left': ((idx + 1) % 4 === 0 ? num = 3 : num = (idx + 1) % 4 - 1) * item.outerWidth(true) + 'px',
			'top': Math.floor(idx / 4) * item.outerHeight(true) + 'px'
		})
	}

	CreateGoods.prototype.addCars = function() {
		this.goods.find(this.addCar).click(()=>{
			if (!Cookie.get('shopCar')) {
				let arr = [this.goods.attr('id')];
				let date = new Date();
				Cookie.set('shopCar', JSON.stringify(arr));
			} else {
				let arr = JSON.parse(Cookie.get('shopCar'));
				arr.push(this.goods.attr('id'));
				Cookie.set('shopCar', JSON.stringify(arr));
			}
		});
	}

});