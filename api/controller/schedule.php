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


echo "ESTO ES UN TEST";

function getBestClassRoomForCapacity($classRooms,$capacity){
    $classRoomCandidate = null;
    $classRoomCandidateIndex = null;
    $classRoomCandidateDiff = null;

    foreach ($classRooms as $index=>$classRoom){
        $crCapacity = intval($classRoom["capacity"]);
        $cCapacity = intval($capacity);

        // Si la capacidad del aula es mayor a la de la cursada y la diferencia es menor a la mejor hasta el momento
        if($crCapacity >= $cCapacity && ($classRoomCandidateDiff > $crCapacity-$cCapacity || $classRoomCandidateDiff === null)){
            $classRoomCandidate = $classRoom;
            $classRoomCandidateIndex = $index;
            $classRoomCandidateDiff = $crCapacity-$cCapacity;
        }
    }

    if($classRoomCandidate !== null){
        return ["classroom"=>$classRoomCandidate, "index"=>$classRoomCandidateIndex, "difference"=>$classRoomCandidateDiff];
    } else {
        return null;
    }
}

switch ($METHOD) {
    case "GET":
        $classService = new ClassService();
        $classroomService = new ClassroomService();
        $turns = ["M","T","N"];
        $classRooms = $classroomService->getAll([]);

        // Reemplazar luego por un for adentro para iterar todos los turnos
        $classes = $classService->getAll(['turn'=>$turns[1]]);

        foreach ($classes as $class){
            echo "Cursada: ";
            echo json_encode($class);

            $bestAula = getBestClassRoomForCapacity($classRooms, $class["capacity"]);
            if($bestAula !== null){
                echo "\nMejor aula encontrada: ";
                unset($classRooms[intval($bestAula["index"])]);
                echo json_encode($bestAula);
            } else {
                echo "No hay aula para esa capacidad.";
            }

            echo "\n\n";
        }

        http_response_code(200);
    break;
    default:
        http_response_code(405);
    break;
}
