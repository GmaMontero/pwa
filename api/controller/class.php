<?php

require_once(dirname(__FILE__).'/../model/CClass.php');
require_once(dirname(__FILE__).'/../model/ApiErrorResponse.php');
require_once(dirname(__FILE__).'/../service/class.php');
require_once(dirname(__FILE__).'/../shared/utilities.php');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "GET":
        $classService = new ClassService();
        echo json_encode($classService->getAll());
        http_response_code(200);
        break;
    case "POST":
        echo validatePostData(function($jsonParsed){
            $classService = new ClassService();
            $classObj = new Cclass($jsonParsed);
            $result = $classService->create($classObj);

            if(!array_key_exists("ERROR", $result)){
                http_response_code(201);
                return new ApiResponse($result, null);
            } else {

                if($result["ERROR"] === "ID_NOT_FOUND"){
                    http_response_code(400);
                } else if ($result["ERROR"] === "ID_DUPLICATED" || $result["ERROR"] === "CLASS_DUPLICATED" || $result["ERROR"] === "MAX_CLASS"){
                    http_response_code(409);
                } else {
                    http_response_code(500);
                }
                return new ApiResponse(null, $result["ERROR"]);
            }
        });
        break;
    case "PUT":
        echo validatePostData(function($jsonParsed){
            $classService = new ClassService();
            $classObj = new Cclass($jsonParsed);
            $result = $classService->update($classObj);

            if(method_exists($result, "getModifiedCount")){
                http_response_code(201);
                return new ApiResponse($result->getModifiedCount(), null);
            } else {
                http_response_code(500);
                return new ApiResponse(null, $result["ERROR"]);
            }
        });
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