<?php

class ClassRoom {
    public $id;
    public $number;
    public $floor;
    public $capacity;

    public function __construct($id, $number, $floor, $capacity){
        $this->id = $id;
        $this->number = $number;
        $this->floor = $floor;
        $this->capacity = $capacity;
    }
}