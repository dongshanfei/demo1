<?php
	$id = $_POST['id'];
	$count = $_POST['count'];
	$id1price = 5999.88;
	$id2price = 3888.50;
	$id3price = 1428.50;
	$id4price = 640.60;

	switch ($id) {
		case '1':
			echo json_encode(array('price'=>round($id1price*$count,2),'message'=>'success'));
			break;
		case '2':
			echo json_encode(array('price'=>round($id2price*$count,2),'message'=>'success'));
			break;
		case '3':
			echo json_encode(array('price'=>round($id3price*$count,2),'message'=>'success'));
			break;
		case '4':
			echo json_encode(array('price'=>round($id4price*$count,2),'message'=>'success'));
			break;
	}
?>