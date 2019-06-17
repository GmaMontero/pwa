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

    public function create($classroomObj){
        return $this->db->insert($classroomObj, $this->collection);
    }

    public function update($classroomObj){
        return $this->db->replaceOne($classroomObj, $this->collection);
    }

    public function delete($id){
        return $this->db->deleteOne(['id' => $id], $this->collection);
    }
}
