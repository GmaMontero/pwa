<?php

require_once('../model/CClass.php');
require_once('../model/ApiErrorResponse.php');

class ClassService {

    public function create($classObj){
        #return var_dump(get_object_vars($classObj));
        return $classObj;
    }

    public function update($classObj){
        return $classObj;
    }

    public function delete($classObj){
        return $classObj;
    }

}

?>