<?php

require_once(dirname(__FILE__).'/../shared/utilities.php');
require_once(dirname(__FILE__).'/../shared/database.php');
require_once(dirname(__FILE__).'/subject.php');

class ClassService {
    private $db;
    private $collection = "class";
    private $maxClasses = 5;
    private $subjectService  = null;
    private $subjects  = [];

    public function __construct(){
        $this->db = new Database();
        $this->subjectService = new SubjectService();
        $this->subjects = $this->subjectService->getAll();
    }

    public function getAll($filter=[]){
        $classes = $this->db->getAll($this->collection, $filter);
        $classes = array_map(function($subject){
            $subject->descriptionSubject = $this->subjectService->getSubjectDescription($this->subjects, $subject->nameSubject);
            return $subject;
        }, $classes);
        return $classes;
    }

    public function existsId($id){
        return count($this->getAll(['id' => $id])) === 1;
    }

    public function getCountForCombination($career, $commission, $turn, $subject){
        if($subject !== null){
            return count($this->getAll(['commission'=>$commission,'career'=>$career,'turn'=>$turn,'nameSubject'=>$subject]));
        } else {
            return count($this->getAll(['commission'=>$commission,'career'=>$career,'turn'=>$turn]));
        }
    }

    public function create($classObj){
        try{
            if($classObj->id === null){
                throw new Exception("ID_NOT_FOUND");
            } else if($this->existsId($classObj->id)){
                throw new Exception("ID_DUPLICATED");
            } else if ($this->getCountForCombination($classObj->career, $classObj->commission, $classObj->turn, $classObj->nameSubject) >= 1){
                throw new Exception("CLASS_DUPLICATED");
            } else if ($this->getCountForCombination($classObj->career, $classObj->commission, $classObj->turn, null) >= $this->maxClasses){
                throw new Exception("MAX_CLASS");
            } else {
                return $this->db->insert($classObj, $this->collection);
            }
        } catch (Exception $e){
            return ['ERROR' => $e->getMessage()];
        }
    }

    public function update($classObj){
        try{
            return $this->db->replaceOne($classObj, $this->collection);
        } catch (Exception $e){
            return ['ERROR' => $e->getMessage()];
        }
    }

    public function delete($id){
        return $this->db->deleteOne(['id' => $id], $this->collection);
    }
}
