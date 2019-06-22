<?php
/**
 * Created by IntelliJ IDEA.
 * User: gmontero
 * Date: 19/05/19
 * Time: 19:27
 */

require_once(dirname(__FILE__).'/../model/Classroom.php');
require_once(dirname(__FILE__).'/../model/ApiErrorResponse.php');
require_once(dirname(__FILE__).'/../service/classroom.php');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "GET":
        $classroomService = new ClassroomService();
        echo json_encode($classroomService->getAll([]));
        http_response_code(200);
        break;
    case "POST":
        echo validatePostData(function($jsonParsed){
            $classroomService = new ClassroomService();
            $classroomObj = new ClassRoom($jsonParsed);
            $result = $classroomService->create($classroomObj);

            if(!array_key_exists("ERROR", $result)){
                http_response_code(201);
                return new ApiResponse($result, null);
            } else {
                if($result["ERROR"] === "ID_NOT_FOUND"){
                    http_response_code(400);
                } else if ($result["ERROR"] === "ID_DUPLICATED"){
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
            $classroomService = new ClassroomService();
            $classroomObj = new ClassRoom($jsonParsed);
            $result = $classroomService->update($classroomObj);

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
            $classroomService = new ClassroomService();
            $deleteCount = $classroomService->delete($jsonParsed->id);
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