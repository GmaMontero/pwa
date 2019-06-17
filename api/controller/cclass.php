<?php

require_once(dirname(__FILE__).'/../model/CClass.php');
require_once(dirname(__FILE__).'/../model/ApiErrorResponse.php');
require_once(dirname(__FILE__).'/../service/cclass.php');
require_once(dirname(__FILE__).'/../shared/utilities.php');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT, DELETE");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "GET":
        $classService = new ClassService();
        echo json_encode($classService->getAll([]));
        http_response_code(200);
        break;
    case "POST":
        echo validatePostData(function($jsonParsed){
            $classService = new ClassService();
            $classObj = new Cclass($jsonParsed);
            $result = $classService->create($classObj);
            http_response_code(201);
            return new ApiResponse($result, null);
        });
        break;
    case "PUT":
        break;
    case "DELETE":
        echo validatePostData(function($jsonParsed){
            $classService = new ClassService();
            $deleteCount = $classService->delete($jsonParsed->id);
            if($deleteCount === 1){
                http_response_code(200);
            } else {
                http_response_code(400);
            }
        });
        break;
    default:
        http_response_code(405);
        break;
}