<?php

require_once(dirname(__FILE__).'/../shared/utilities.php');
require_once(dirname(__FILE__).'/../shared/database.php');

class ClassService {
    private $db;
    private $collection = "class";

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll($filter){
        $result = $this->db->getAll($this->collection, $filter);
        return $result;
    }

    public function create($classObj){
        try{
            return $this->db->insert($classObj, $this->collection);
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
