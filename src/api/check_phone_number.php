<?php 
	include "database.php";

	$phone_number = isset($_GET['phone_number']) ? $_GET['phone_number'] : null;

	$sql = "SELECT * FROM user WHERE phone_number='$phone_number'";

	$result = $conn->query($sql);

	if ($result->num_rows>0) {
		echo "no";
	} else {
		echo "yes";
	}
 ?>