<?php

require_once('../model/CClass.php');
require_once('../model/ApiErrorResponse.php');
require_once('../model/ApiErrorResponse.php');
$collection = (new MongoDB\Client)->pwa->cclass;

class ClassService {

    public function create($classObj){
        #return var_dump(get_object_vars($classObj));
        $insertResult = $collection->insertOne($classObj->getAsMongoModel());
       
        if ($insertResult->getInsertedCount() == 1) {
           #Obtener id y devolver instancia 
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
