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
    private $days;
    private $classService;
    private $classroomService;
    private $classRooms;

    public function __construct(){
        $this->classService = new ClassService();
        $this->classroomService = new ClassroomService();
        $this->classRooms = $this->classroomService->getAll([]);
        $this->turns = ["M", "T", "N"];
        $this->days = ["Lunes","Martes","Miercoles","Jueves","Viernes"];
    }

    private function getClassModel($class){
        return [
            "id" => $class["id"],
            "career" => $class["career"],
            "commission" => $class["commission"],
            "nameSubject" => $class["nameSubject"],
            "turn" => $class["turn"],
            "capacity" => $class["capacity"]
        ];
    }

    private function getBestClassroomModel($bestClassroom){
        return [
            "classroomNumber" => $bestClassroom["classroom"]["number"],
            "classroomDelta" => $bestClassroom["difference"]
        ];
    }

    private function getBestClassRoomForCapacity($classRooms, $capacity){
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

    public function getSchedule($type="turn"){
        $classesWithoutRooms = [];
        $classesByType = [];

        // BY TURN
        foreach ($this->turns as $currentTurn){
            $classes = $this->classService->getAll(['turn'=>$currentTurn]);

            // BY DAY
            foreach ($this->days as $dayOfWeek){
                $classRoomsByDay = $this->classRooms;
                if(!array_key_exists($dayOfWeek, $classesByType)){
                    $classesByType[$dayOfWeek] = [];
                }

                // BY CLASS
                foreach ($classes as $indexClass=>$class){
                    $bestClassroom = $this->getBestClassRoomForCapacity($classRoomsByDay, $class["capacity"]);

                    if($bestClassroom !== null) {
                        // Sacar la materia de la lista porque ya tiene aula
                        unset($classes[intval($indexClass)]);

                        // Eliminar la room para ese turno
                        unset($classRoomsByDay[intval($bestClassroom["index"])]);

                        $classWithRoom = [
                            "classRoom" => $this->getBestClassroomModel($bestClassroom),
                            "class" => $this->getClassModel($class)
                        ];

                        if($type === "turn"){
                            $keyForType = $class["turn"];
                        } else {
                            $keyForType = $bestClassroom["classroom"]["number"];
                        }

                        if(!array_key_exists($keyForType, $classesByType[$dayOfWeek])){
                            $classesByType[$dayOfWeek][$keyForType] = [];
                        }

                        array_push($classesByType[$dayOfWeek][$keyForType], $classWithRoom);
                    }
                }
            }

            // Despues de haber iterado los 5 dias, las clases que no fueron asignadas es porque no entran
            foreach ($classes as $iClassWithoutRoom=>$classWithoutRoom){
                array_push($classesWithoutRooms, $this->getClassModel($classWithoutRoom));
            }
        }

        return [
            "classes" => $classesByType,
            "classesWithoutRooms" => $classesWithoutRooms
        ];
    }
}