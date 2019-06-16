<?php

require_once('../shared/utilities.php');

class ClassService {

    public function create($classObj){
        $conn = getDbConnection();
        $collection = $conn->cclass;
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
