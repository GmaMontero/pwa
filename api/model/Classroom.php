<?php

class ClassRoom {
    public $id;
    public $number;
    public $floor;
    public $capacity;

    public function __construct($json){
        $this->id = $json->id;
        $this->number = $json->number;
        $this->floor = $json->floor;
        $this->capacity = $json->capacity;
    }

    public function getAsMongoModel(){
        return [
            'id' => $this->id,
            'number' =>  $this->number,
            'floor' => $this->floor,
            'capacity' =>  $this->capacity
        ];
    }
}