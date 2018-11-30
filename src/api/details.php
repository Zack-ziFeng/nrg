<?php 
	header("Content-type=text/html;charset=utf-8");
	include "database.php";
	$id = isset($_GET['id']) ? $_GET['id'] : null;
	$sql = "SELECT * FROM goods WHERE id='$id'";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();

	echo json_encode($row);
 ?>