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

$classroomService = new ClassroomService();

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT, DELETE");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "GET":
        echo json_encode($classroomService->getAll([]));
        http_response_code(200);
        break;
    case "POST":
        $body = file_get_contents('php://input');
        if($body !== false) {
            $jsonParsed = json_decode($body, false);

            if(is_null($jsonParsed)){
                http_response_code(400);
                echo new ApiResponse(null, "Request body cant parse as JSON");
            } else {
                $classroomObj = new ClassRoom($jsonParsed);
                $result = $classroomService->create($classroomObj);
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
        $body = file_get_contents('php://input');
        if($body !== false) {
            $jsonParsed = json_decode($body, false);

            if(is_null($jsonParsed)){
                http_response_code(400);
                echo new ApiResponse(null, "Request body cant parse as JSON");
            } else {
                $deleteCount = $classroomService->delete($jsonParsed->id);

                if($deleteCount === 1){
                    http_response_code(200);
                } else {
                    http_response_code(400);
                }
            }
        } else {
            http_response_code(400);
            echo new ApiResponse(null, "Request body is not present");
        }
        break;
    default:
        http_response_code(405);
        break;
}