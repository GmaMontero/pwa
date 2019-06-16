<?php
#require_once('../model/CClass.php');
#require_once('../model/ApiErrorResponse.php');
#require_once('../model/ApiErrorResponse.php');
//By default, we assume that PHP is NOT running on windows.
$isWindows = false;
//If the first three characters PHP_OS are equal to "WIN",
//then PHP is running on a Windows operating system.
if(strcasecmp(substr(PHP_OS, 0, 3), 'WIN') == 0){
    $isWindows = true;
}
//If $isWindows is TRUE, then print out a message saying so.
if($isWindows){
    require '../../vendorwin/autoload.php';
} else {
    require '../../vendor/autoload.php';
}

$client = new MongoDB\Client("mongodb://pwa:Trend123@pwa-web.tk:27017/pwa");

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
