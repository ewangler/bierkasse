<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
  http_response_code($status);
  return array_merge([
      'success' => $success,
      'status' => $status,
      'message' => $message
  ],$extra);
}

$input = json_decode(file_get_contents('php://input'));
$returnData = [];

if($input) {
  $password = $input->{'credentials'}->{'password'};
  $username = $input->{'credentials'}->{'username'};

  if($username == 'bib' && $password == '123') {
   $code = 200;
    $returnData = [
      'success' => 1,
      'message' => 'You have successfully logged in.',
      'token' => 'verySecureToken' // add token
    ];
  
  } else {
    $code = 401;
    $returnData = msg(0,401,'Invalid Password!');
  }
}

echo json_encode($returnData);
?>