<?php

require_once(dirname(__FILE__).'/../shared/utilities.php');
require_once(dirname(__FILE__).'/../shared/database.php');

class ClassService {
    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function create($classObj){
        return $this->db->insert($classObj, "cclass");
    }

    public function update($classObj){
        return $classObj;
    }

    public function delete($classObj){
        return $classObj;
    }
}

?>
