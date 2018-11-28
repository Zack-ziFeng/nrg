<?php
	header("Content-type=text/html; charset=utf-8");
	include "database.php";

	$page = isset($_GET['page']) ? $_GET['page'] : null;
	$qty = 40;

	$sql = "SELECT * FROM goods";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();

	$msg = array(
		'total' => count($row),
		"data" => array_slice($row, ($page-1)*$qty, $qty),
		"page" => $page,
		"qty" => $qty
	);
	
	echo json_encode($msg);
 ?>