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
            "capacity" => $class["capacity"],
            "descriptionSubject" => $class["descriptionSubject"],
            "descriptionCareer" => $class["descriptionCareer"]
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

    private function getClassWithCommissionCareerAndTurn($classesDay, $class){
        foreach ($classesDay as $currentClass){
            if($currentClass["class"]["commission"] === $class->commission &&
                $currentClass["class"]["career"] === $class->career &&
                $currentClass["class"]["turn"] === $class->turn){
                return $currentClass;
            }
        }

        return null;
    }

    private function groupByTurn($classes){
        foreach ($this->days as $indexDay=>$day){
            $classes[$day] = array_reduce($classes[$day], function($acc, $class){
                $turn = $class["class"]["turn"];
                if(!array_key_exists($turn, $acc)){
                    $acc[$turn] = [];
                }

                array_push($acc[$turn], $class);
                return $acc;
            }, []);
        }

        return $classes;
    }

    private function groupByRoomNumber($classes){
        foreach ($this->days as $indexDay=>$day){
            $classes[$day] = array_reduce($classes[$day], function($acc, $class){
                $classRoomNumber = $class["classRoom"]["classroomNumber"];
                if(!array_key_exists($classRoomNumber, $acc)){
                    $acc[$classRoomNumber] = [];
                }

                array_push($acc[$classRoomNumber], $class);
                return $acc;
            }, []);
        }

        return $classes;
    }

    public function getSchedule(){
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
                        $alreadyAssigned = $this->getClassWithCommissionCareerAndTurn($classesByType[$dayOfWeek], $class);

                        if($alreadyAssigned === null){
                            unset($classes[intval($indexClass)]);
                            unset($classRoomsByDay[intval($bestClassroom["index"])]);

                            $classWithRoom = [
                                "classRoom" => $this->getBestClassroomModel($bestClassroom),
                                "class" => $this->getClassModel($class)
                            ];

                            array_push($classesByType[$dayOfWeek], $classWithRoom);
                        }
                    }
                }
            }

            // Despues de haber iterado los 5 dias, las clases que no fueron asignadas es porque no entran
            foreach ($classes as $iClassWithoutRoom=>$classWithoutRoom){
                array_push($classesWithoutRooms, $this->getClassModel($classWithoutRoom));
            }
        }

        return [
            "classes" => [
                "byTurn" => $this->groupByTurn($classesByType),
                "byRoomNumber" => $this->groupByRoomNumber($classesByType)
            ],
            "classesWithoutRooms" => $classesWithoutRooms
        ];
    }
}