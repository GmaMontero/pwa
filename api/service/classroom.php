<?php

require_once(dirname(__FILE__).'/../shared/utilities.php');
require_once(dirname(__FILE__).'/../shared/database.php');

class ClassroomService {
    private $db;
    private $collection = "classroom";

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll($filter){
        $result = $this->db->getAll($this->collection, $filter);
        return $result;
    }

    public function existsId($id){
        return count($this->getAll(['id' => $id])) === 1;
    }

    public function create($classroomObj){
        try {
            if($classroomObj->id === null) {
                throw new Exception("ID_NOT_FOUND");
            } else if($this->existsId($classroomObj->id)){
                throw new Exception("ID_DUPLICATED");
            } else {
                return $this->db->insert($classroomObj, $this->collection);
            }
        } catch (Exception $e){
            return ['ERROR' => $e->getMessage()];
        }
    }

    public function update($classroomObj){
        try {
            return $this->db->replaceOne($classroomObj, $this->collection);
        } catch (Exception $e){
            return ['ERROR' => $e->getMessage()];
        }
    }

    public function delete($id){
        return $this->db->deleteOne(['id' => $id], $this->collection);
    }
}
