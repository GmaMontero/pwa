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

$classService = new ClassroomService();

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PUT, DELETE");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "GET":
        echo json_encode($classService->getAll([]));
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