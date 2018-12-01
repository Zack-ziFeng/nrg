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

	function randomCode(){
		let str = "";
		let arr = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		for (let i=0; i<4; i++) {
			str += arr[Math.floor(Math.random()*arr.length)];
		}
		$('.check_code').text(str);
		code_val = str.toLowerCase();
	}

	function sign_in(url, data, string) {
		if (check_code) {
			$.ajax({
				type: 'POST',
				url: url,
				async: true,
				data: data,
				success: function(str) {
					if (str === 'yes') {
						Cookie.set('username', data.username || data.phone_number, {path: '/'});
						location.href = '../index.html';
					} else {
						randomCode();
						alert(string);
						$('input').val('');
					}
				}
			});
		}
	}

	let code_val = '';
	let check_code = false;

	$('.sign_in_search li:first-child').click(function() {
		$('.sign_in_search li').attr('class', '');
		$(this).attr('class', 'active');
		$('.m_code').css('display', 'block');
		$('.m_phone').css('display', 'none');
		randomCode();
	});

	$('.sign_in_search li:last-child').click(function() {
		$('.sign_in_search li').attr('class', '');
		$(this).attr('class', 'active');
		$('.m_code').css('display', 'none');
		$('.m_phone').css('display', 'block');
		randomCode();
	});

	randomCode();
	$('.check_code').click(function() {
		randomCode();
	});

	$('.check_code').prev().blur(function() {
		if ($(this).val().toLowerCase() === code_val) {
			check_code = true;
			$('.check_code').prev().css('border-color', '#ccc');
			$('.check_code').prev().prev().css('border-color', '#ccc');
		} else {
			check_code = false;
			$('.check_code').prev().css('border-color', '#f00');
			$('.check_code').prev().prev().css('border-color', '#f00');
		}
	});

	$('#sign_in1').click(function() {
		sign_in('../api/sign_in_user.php', {
			'username': $('#username').val(),
			'password': $('#psw1').val()
		}, '用户名或密码错误');
	});

	$('#sign_in2').click(function() {
		sign_in('../api/sign_in_phone.php', {
			'phone_number': $('#phone_number').val(),
			'password': $('#psw2').val()
		}, '手机号码或密码错误');
	});
});