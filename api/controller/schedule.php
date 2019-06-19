<?php
/**
 * Created by IntelliJ IDEA.
 * User: gmontero
 * Date: 18/06/19
 * Time: 23:43
 */

require_once(dirname(__FILE__).'/../model/ApiErrorResponse.php');
require_once(dirname(__FILE__).'/../service/classroom.php');
require_once(dirname(__FILE__).'/../service/cclass.php');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "GET":
        echo '{"status":"OK"}';
        http_response_code(200);
    break;
    default:
        http_response_code(405);
    break;
}
