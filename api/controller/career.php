<?php

/*require_once(dirname(__FILE__).'/../model/CClass.php');*/
require_once(dirname(__FILE__).'/../model/ApiErrorResponse.php');
require_once(dirname(__FILE__).'/../service/career.php');
require_once(dirname(__FILE__).'/../shared/utilities.php');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

$METHOD = $_SERVER['REQUEST_METHOD'];

if ($METHOD === "GET")
{
    $careerService = new CareerService();
    echo json_encode($careerService->getAll([]));
    http_response_code(200);
}else{
    http_response_code(404);
} 