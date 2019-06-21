<?php

class CClass {
    public $_id;
    public $id;
    public $nameSubject;
    public $career;
    public $capacity;
    public $turn;
    public $commission;

    public function __construct($json){
        $this->id = (string) $json->id;
        $this->nameSubject = $json->nameSubject;
        $this->career = $json->career;
        $this->capacity = $json->capacity;
        $this->turn = $json->turn;
        $this->commission= $json->commission;
    }
    
    public function getAsMongoModel(){
        return [
            'id' => $this->id,
            'nameSubject' =>  $this->nameSubject,
            'career' => $this->career,
            'capacity' =>  $this->capacity,
            'turn' =>  $this->turn,
            'commission' =>  $this->commission,
        ];
    }    
}
