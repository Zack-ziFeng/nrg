<?php 
	include "database.php";

	$username = isset($_POST['username']) ? $_POST['username'] : null; 
	$password = isset($_POST['password']) ? $_POST['password'] : null;

	$sql = "SELECT password FROM user WHERE username='$username'";

	$result = $conn->query($sql);
	$row = $result->fetch_assoc();
	$result->close();
	if ($row['password'] === $password) {
		echo 'yes';
	} else {
		echo 'no';
	}
 ?>