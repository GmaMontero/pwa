<?php

require_once(dirname(__FILE__).'/../shared/utilities.php');
require_once(dirname(__FILE__).'/../shared/database.php');

class CareerService {
    private $db;
    private $collection = "career";

    public function __construct(){
        $this->db = new Database();
    }

    public function getAll($filter=[]){
        $result = $this->db->getAll($this->collection, $filter);
        return $result;
    }

    public function delete($id){
        return $this->db->deleteOne(['id' => $id], $this->collection);
    }

    public function getCareerDescription($careers, $careerId){
        $careerFiltered = array_filter(
            $careers,
            function ($e) use ($careerId) {
                return $e->id === $careerId;
            }
        );

        if(count($careerFiltered) === 1){
            return array_values($careerFiltered)[0]->name;
        } else {
            return null;
        }
    }
}

