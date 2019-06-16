<?php

#require_once('../model/CClass.php');
#require_once('../model/ApiErrorResponse.php');
#require_once('../model/ApiErrorResponse.php');

require_once('../shared/utilities.php');

class ClassService {

    public function create($classObj){
        $db = getDbConnection();
        $insertResult = $db->class->insertOne($classObj->getAsMongoModel());
       
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
