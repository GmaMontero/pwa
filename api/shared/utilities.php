<?php
/**
 * Created by IntelliJ IDEA.
 * User: gmontero
 * Date: 19/05/19
 * Time: 18:46
 */

function validatePostData($fnSuccess){
    $body = file_get_contents('php://input');
    if($body !== false) {
        $jsonParsed = json_decode($body, false);

        if(is_null($jsonParsed)){
            http_response_code(400);
            return new ApiResponse(null, "Request body cant parse as JSON");
        } else {
            return $fnSuccess($jsonParsed);
        }
    } else {
        http_response_code(400);
        return new ApiResponse(null, "Request body is not present");
    }
}