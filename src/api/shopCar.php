<?php 
	header("Content-type=text/html;charset=utf-8");
	include "database.php";
	$idxArr = isset($_GET['idxArr']) ? $_GET['idxArr'] : null;
	$idxArr = json_decode($idxArr);
	$goodsArr = array();

	for ($i=0;$i<count($idxArr);$i++) {
		$sql = "SELECT * FROM goods WHERE id='$idxArr[$i]'";
		$result = $conn->query($sql);
		$row = $result->fetch_all(MYSQLI_ASSOC);
		$result->close();
		$goodsArr[] = $row[0];
	}

	echo json_encode($goodsArr);
 ?>