<?php 
	include "database.php";

	$username = isset($_GET['username']) ? $_GET['username'] : null;

	$sql = "SELECT * FROM user WHERE username='$username'";

	$result = $conn->query($sql);

	if ($result->num_rows>0) {
		echo "no";
	} else {
		echo "yes";
	}
 ?>