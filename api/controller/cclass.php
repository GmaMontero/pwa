<?php

require_once(dirname(__FILE__).'/../model/CClass.php');
require_once(dirname(__FILE__).'/../model/ApiErrorResponse.php');
require_once(dirname(__FILE__).'/../service/cclass.php');

$classService = new ClassService;

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT, DELETE");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "POST":
        $body = file_get_contents('php://input');
        if($body !== false) {
            $jsonParsed = json_decode($body, false);

            if(is_null($jsonParsed)){
                http_response_code(400);
                echo new ApiResponse(null, "Request body cant parse as JSON");
            } else {
                $classObj = new Cclass($jsonParsed);
                $result = $classService->create($classObj);
                http_response_code(201);
                echo new ApiResponse($result, null);
            }
        } else {
            http_response_code(400);
            echo new ApiResponse(null, "Request body is not present");
        }
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        http_response_code(405);
        break;
}




?>