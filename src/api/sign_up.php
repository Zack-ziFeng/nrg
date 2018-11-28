<?php 
	include "database.php";

	$username = isset($_POST['username']) ? $_POST['username'] : null; 
	$password = isset($_POST['password']) ? $_POST['password'] : null; 
	$phone_number = isset($_POST['phone_number']) ? $_POST['phone_number'] : null;

	$sql = "INSERT INTO user(username,phone_number,password) VALUES('$username','$phone_number','$password')";

	$result = $conn->query($sql);

	if($result){
		echo "success";
	}else{
		echo "fail";
	}
 ?>