<?php

require_once(dirname(__FILE__).'/../shared/utilities.php');
require_once(dirname(__FILE__).'/../shared/database.php');

class SubjectService {
    private $db;
    private $collection = "subject";

    public function __construct(){
        $this->db = new Database();
    }


    public function getAll($filter){
        $result = $this->db->getAll($this->collection, $filter);
        return $result;
    }

    public function delete($id){
        return $this->db->deleteOne(['id' => $id], $this->collection);
    }
}

