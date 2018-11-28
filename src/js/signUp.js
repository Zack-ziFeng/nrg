$(function(){

	let check_username = false;
	let check_phone_number = false;
	let check_password = false;
	let check_password2 = false;
	let check_code = false;
	let code_val = "";

	function randomCode(){
		let str = "";
		let arr = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		for (let i=0; i<4; i++) {
			str += arr[Math.floor(Math.random()*arr.length)];
		}
		$('#code').next().text(str);
		code_val = str.toLowerCase();
	}

	randomCode();

	$('#username').blur(function() {
		let $user = $(this);
		let username = $(this).val();
		if (!username) {
			check_username = false;
			$(this).next().text('用户名不能为空');
			$(this).next().css('color', '#f00');
		} else {
			if (!/^[a-zA-Z][\w]{2,11}$/.test(username)) {
				check_username = false;
				$(this).next().text('以英文开头，3-12个字符');
				$(this).next().css('color', '#f00');
			} else {
				$.ajax({
					type: 'GET',
					url: '../api/check_name.php',
					async: true,
					data: {
						'username':username
					},
					success:function(str) {
						if (str === "yes") {
							check_username = true;
							$user.next().text('用户名可用');
							$user.next().css('color', '#26ce26');
						} else {
							check_username = false;
							$user.next().text('用户名已存在');
							$user.next().css('color', '#f00');
						}
					}
				});
			}
		}
	});

	$('#phone_number').blur(function () {
		let $number = $(this);
		let phone_number = $(this).val();
		if (!phone_number) {
			check_phone_number = false;
			$(this).next().text('手机号码不能为空');
			$(this).next().css('color', '#f00');
		} else {
			if (!/^1[34578]\d{9}$/.test(phone_number)) {
				check_phone_number = false;
				$(this).next().text('11位手机号码');
				$(this).next().css('color', '#f00');
			} else {
				$.ajax({
					type: 'GET',
					url: '../api/check_phone_number.php',
					async: true,
					data: {
						'phone_number':phone_number
					},
					success:function(str) {
						if (str === "yes") {
							check_phone_number = true;
							$number.next().text('手机号码可用');
							$number.next().css('color', '#26ce26');
						} else {
							check_phone_number = false;
							$number.next().text('手机号码已激活');
							$number.next().css('color', '#f00');
						}
					}
				});
			}
		}
	});

	$('#psw1').blur(function() {
		let $psw = $(this);
		let password = $(this).val();
		if (!password) {
			check_password = false;
			$(this).next().text('密码不能为空');
			$(this).next().css('color', '#f00');
		} else {
			if (!/^[\S]{6,20}$/.test(password)) {
				check_password = false;
				$(this).next().text('密码不合格');
				$(this).next().css('color', '#f00');
			} else {
				check_password = true;
				$(this).next().css('color', 'transparent');
			}
		}
	});

	$('#psw2').blur(function() {
		let password1 = $(this).val();
		let password2 = $('#psw1').val();
		if (!password1) {
			check_password2 = false;
			$(this).next().text('不能为空');
			$(this).next().css('color', '#f00');
		} else {
			if (password1 !== password2) {
				check_password2 = false;
				$(this).next().text('两次密码不一样');
				$(this).next().css('color', '#f00');
			} else {
				check_password2 = true;
				$(this).next().css('color', 'transparent');
			}
		}
	});

	$('#code').next().click(function() {
		randomCode();
	});

	$('#code').blur(function() {
		if ($(this).val().toLowerCase() === code_val) {
			check_code = true;
			$(this).next().next().css('color', 'transparent');
		} else {
			check_code = false;
			$(this).next().next().text('验证码错误');
			$(this).next().next().css('color', '#f00');
		}
	});

	$('#sign_up').click(function() {
		if (check_username && check_phone_number && check_password && check_password2 && check_code) {
			$.ajax({
				type: 'POST',
				url: '../api/sign_up.php',
				async: true,
				data: {
					'username': $('#username').val(),
					'phone_number': $('#phone_number').val(),
					'password': $('#psw1').val()
				},
				success: function(str) {
					if (str === 'success') {
						alert('注册成功');
						location.href = '../html/signIn.html';
					} else {
						alert('注册失败');
						$('input').val("");
						$('.warn').css('color', 'transparent');
					}
				}
			});
		} else {
			alert('输入的信息有错误');
		}
	});
});