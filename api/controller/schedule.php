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
        $classRooms = $classroomService->getAll([]);
        $classesWithoutRooms = [];
        $classesByTurn = [
            "M" => [],
            "T" => [],
            "N" => []
        ];
        $turns = array_keys($classesByTurn);

        // Reemplazar luego por un for adentro para iterar todos los turnos
        $classes = $classService->getAll(['turn'=>$turns[1]]);

        foreach ($classes as $class){
            $bestClassroom = getBestClassRoomForCapacity($classRooms, $class["capacity"]);
            if($bestClassroom !== null){
                // Elimino del array de las aulas, a la elegida
                unset($classRooms[intval($bestClassroom["index"])]);

                // Le asigno a la clase, el numero de aula
                $class["classRoom"] = $bestClassroom["number"];

                // Pusheo al array del turno, la clase
                array_push($classesByTurn[$class["turn"]], $class);
            } else {
                // Pusheo al array la clase que no encontro aula
                array_push($classesWithoutRooms, $class);
            }
        }

        echo json_encode([
            "classesByTurn" => $classesByTurn,
           "classesWithoutRooms" => $classesWithoutRooms
        ]);

        http_response_code(200);
    break;
    default:
        http_response_code(405);
    break;
}
