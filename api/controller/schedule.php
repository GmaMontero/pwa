<?php
/**
 * Created by IntelliJ IDEA.
 * User: gmontero
 * Date: 18/06/19
 * Time: 23:43
 */

require_once(dirname(__FILE__).'/../service/schedule.php');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

$METHOD = $_SERVER['REQUEST_METHOD'];

switch ($METHOD) {
    case "GET":
        $scheduleService = new ScheduleService();

        if(isset($_GET["type"]) && in_array($_GET["type"], ['turn','room'])){
            $resultService = $scheduleService->getSchedule($_GET["type"]);
        } else {
            $resultService = $scheduleService->getSchedule();
        }

        echo json_encode($resultService);
        http_response_code(200);
    break;
    default:
        http_response_code(405);
    break;
}
