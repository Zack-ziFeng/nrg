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
 - 1    }

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
        Cookie.remove('shopCar');
        Cookie.remove('username');
        $('.before').css('display', 'block');
        $('.after').css('display', 'none');
        $('.a_user').text('');
        location.href='../index.html';
    });

    let goodsArr = [];
    for (let i=0; i<8; i++) {
        goodsArr.push(Math.floor(Math.random()*500 + 1))
    }

    $.ajax({
        type: 'GET',
        url: 'api/shopCar.php',
        async: true,
        data: {
            'idxArr': JSON.stringify(goodsArr)
        },
        success: function(str) {
            console.log(JSON.parse(str))
            let item = JSON.parse(str);
            new IndexItem(item);
        }
    });

    let IndexItem = function(arr) {
        this.loca = '.m_goods';
        this.init(arr);
    }

    IndexItem.prototype.init = function(arr) {
        for (let i=1; i<=8; i++) {
            $item = $(`
                <li>
                    <a href="html/details.html?id=${arr[i - 1].id}">
                        <div class="m_img"><img src="img/good_list/${arr[i - 1].img}"><span>今日</span></div>
                        <p><a href="html/details.html?id=${arr[i - 1].id}">${arr[i - 1].name}</a></p>
                        <span class="m_price">￥&nbsp;<strong>${arr[i - 1].new_price}</strong></span><button>去下单</button>
                    </a>
                </li>
                <li>
                    <a href="html/details.html?id=${arr[i - 1].id}">
                        <div class="m_img"><img src="img/good_list/${arr[i - 1].img}"><span>今日</span></div>
                        <p><a href="html/details.html?id=${arr[i - 1].id}">${arr[i - 1].name}</a></p>
                        <span class="m_price">￥&nbsp;<strong>${arr[i - 1].new_price}</strong></span><button>去下单</button>
                    </a>
                </li>
                <li>
                    <a href="html/details.html?id=${arr[i - 1].id}">
                        <div class="m_img"><img src="img/good_list/${arr[i - 1].img}"><span>今日</span></div>
                        <p><a href="html/details.html?id=${arr[i - 1].id}">${arr[i - 1].name}</a></p>
                        <span class="m_price">￥&nbsp;<strong>${arr[i - 1].new_price}</strong></span><button>去下单</button>
                    </a>
                </li>
                <li>
                    <a href="html/details.html?id=${arr[i - 1].id}">
                        <div class="m_img"><img src="img/good_list/${arr[i - 1].img}"><span>今日</span></div>
                        <p><a href="html/details.html?id=${arr[i - 1].id}">${arr[i - 1].name}</a></p>
                        <span class="m_price">￥&nbsp;<strong>${arr[i - 1].new_price}</strong></span><button>去下单</button>
                    </a>
                </li>
            `);
            $(`#goods${i} ` + this.loca).append($item);
        }
    }
});