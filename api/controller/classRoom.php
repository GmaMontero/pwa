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
header("Access-Control-Allow-Methods: POST, PUT, DELETE");

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
            http_response_code(201);
            return new ApiResponse($result, null);
        });
        break;
    case "PUT":
        echo validatePostData(function($jsonParsed){
            $classroomService = new ClassroomService();
            $classroomObj = new ClassRoom($jsonParsed);
            $updateCount = $classroomService->update($classroomObj);
            if($updateCount === 1){
                http_response_code(200);
            } else {
                http_response_code(400);
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