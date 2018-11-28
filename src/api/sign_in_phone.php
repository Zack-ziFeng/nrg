<?php 
	include "database.php";

	$phone_number = isset($_POST['phone_number']) ? $_POST['phone_number'] : null; 
	$password = isset($_POST['password']) ? $_POST['password'] : null;

	$sql = "SELECT password FROM user WHERE phone_number='$phone_number'";

	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$result->close();
	if ($row['password'] === $password) {
		echo 'yes';
	} else {
		echo 'no';
	}
 ?>