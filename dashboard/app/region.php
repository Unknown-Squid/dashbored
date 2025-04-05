<?php

$servername = "localhost";
$username = "root";
$password = "Pokemon_1234";
$dbname = "park_it_web";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT DISTINCT Region FROM reg_div_dis_school_select;";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$data = array();
while($row = $result->fetch_assoc()) {
    $data[] = $row;
}
header('Content-Type: application/json');
echo json_encode($data);

$stmt->close();

$conn->close();
?>