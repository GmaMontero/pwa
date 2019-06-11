<?php

//curl --request POST \
//--url http://localhost:8082/api/controller/_class.php \
//  --header 'cache-control: no-cache' \
//--header 'content-type: application/json' \
//--header 'postman-token: 499cf421-1b98-7a45-1812-86fe9a803293' \
//--data '{"id":"PWA","nameSubject":"Programacion","career":"sistemas","capacity":40,"turn":"N","hour":"20","commission":"B"}'

class CClass {
    public $id;
    public $nameSubject;
    public $career;
    public $capacity;
    public $turn;
    public $commission;

    public function __construct($json){
        $this->id = $json->id;
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
        ]
    }    
}
