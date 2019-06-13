<?php

require_once('../model/CClass.php');
require_once('../model/ApiErrorResponse.php');
require_once('../model/ApiErrorResponse.php');

$client = new MongoDB\Client(
    'mongodb+srv://pwa:Trend123@localhost:27017/pwa'
);

$collection = $client->pwa->cclass;

class ClassService {

    public function create($classObj){
        #return var_dump(get_object_vars($classObj));
        $insertResult = $collection->insertOne($classObj->getAsMongoModel());
       
        if ($insertResult->getInsertedCount() == 1) {
            $classObj->id = $insertResult->getInsertedId();
            return $classObj;
        } else {
            return null;   
        }
    }

    public function update($classObj){
        return $classObj;
    }

    public function delete($classObj){
        return $classObj;
    }

}

?>
