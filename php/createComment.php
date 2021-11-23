<?php
// 댓글 작성 php
require_once("dbconfig.php");
$_POST = JSON_DECODE(file_get_contents("php://input"), true);

$contentId = $_POST["contentId"];
$comment = $_POST["new_comment"];

if ($comment != null) {
    $sql = "INSERT INTO `comments` (`contentId`, `comment`)
    VALUES ('$contentId', '$comment')";
    $db->query($sql);
    echo true;  // 성공
} else {
    echo false; // 실패
}

mysqli_close($db);