<?php
/**
 * Created by IntelliJ IDEA.
 * User: gmontero
 * Date: 18/06/19
 * Time: 23:43
 */

require_once(dirname(__FILE__).'/../model/ApiErrorResponse.php');
require_once(dirname(__FILE__).'/classroom.php');
require_once(dirname(__FILE__).'/class.php');

class ScheduleService {
    private $turns;
    private $classService;
    private $classroomService;
    private $classRooms;

    public function __construct(){
        $this->classService = new ClassService();
        $this->classroomService = new ClassroomService();
        $this->classRooms = $this->classroomService->getAll([]);
        $this->turns = ["M", "T", "N"];
    }

    private function getClassModel($class){
        return [
            "career" => $class["career"],
            "commission" => $class["commission"],
            "nameSubject" => $class["nameSubject"]
        ];
    }

    private function getBestClassroomModel($bestClassroom){
        return [
            "classroomNumber" => $bestClassroom["classroom"]["number"],
            "classroomDelta" => $bestClassroom["difference"]
        ];
    }

    private function getBestClassRoomForCapacity($capacity){
        $classRoomCandidate = null;
        $classRoomCandidateIndex = null;
        $classRoomCandidateDiff = null;

        foreach ($this->classRooms as $index=>$classRoom){
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

    public function getSchedule($type="turn"){
        $classesWithoutRooms = [];
        $classesByType = [];

        foreach ($this->turns as $currentTurn){
            // Reemplazar luego por un for adentro para iterar todos los turnos
            $classes = $this->classService->getAll(['turn'=>$currentTurn]);

            foreach ($classes as $class){
                $bestClassroom = $this->getBestClassRoomForCapacity($class["capacity"]);

                if($bestClassroom !== null){
                    // Elimino del array de las aulas, a la elegida
                    unset($this->classRooms[intval($bestClassroom["index"])]);

                    $classWithRoom = [
                        "classRoom" => $this->getBestClassroomModel($bestClassroom),
                        "class" => $this->getClassModel($class)
                    ];

                    if($type === "turn"){
                        $keyForType = $class["turn"];
                    } else {
                        $keyForType = $bestClassroom["classroom"]["number"];
                    }

                    if($classesByType[$keyForType] === null){
                        $classesByType[$keyForType] = [];
                    }

                    array_push($classesByType[$keyForType], $classWithRoom);
                } else {
                    // Pusheo al array la clase que no encontro aula
                    array_push($classesWithoutRooms, $this->getClassModel($class));
                }
            }
        }

        return [
            "classesByTurn" => $classesByType,
            "classesWithoutRooms" => $classesWithoutRooms
        ];
    }
}