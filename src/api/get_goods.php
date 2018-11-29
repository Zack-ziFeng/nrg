<?php
	header("Content-type=text/html; charset=utf-8");
	include "database.php";

	$page = isset($_GET['page']) ? $_GET['page'] : null;
	$type = isset($_GET['type']) ? $_GET['type'] : null;
	$qty = 36;

	switch ($type) {
		case 'def':
			$sql = "SELECT * FROM goods";
			break;
		case 'num':

			break;
		default:
			# code...
			break;
	}

	$sql = "SELECT * FROM goods";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();

	$msg = array(
		'total' => count($row),
		"data" => array_slice($row, ($page-1)*$qty, $qty),
		"page" => $page,
		"length" => ceil(count($row) / $qty)
	);
	
	echo json_encode($msg);
 ?>