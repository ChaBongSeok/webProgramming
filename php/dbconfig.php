<?php
// error 처리
error_reporting(E_ALL);
ini_set("display_errors", 1);

// json 통신
header("Content_Type:application/json");

$host = '203.255.3.144:1314';
$user = 'web21';
$pw = 'roalqufn-12';
$dbName = 'web21';

// $db = new mysqli($host, $user, $pw, $dbName);

// mysqli_set_charset($db, "utf8");