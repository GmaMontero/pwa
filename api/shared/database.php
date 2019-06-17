<?php

class Database {
    private $connectionString = "mongodb://pwa:Trend123@pwa-web.tk:27017/pwa";
    private $conn;

    public function __construct(){
        $this->conn = $this->getDbConnection();
    }

    private function isWindows(){
        return strcasecmp(substr(PHP_OS, 0, 3), 'WIN') == 0;
    }

    private function isUbuntu(){
        $server_software = strtolower($_SERVER['SERVER_SOFTWARE']);
        return !(strpos($server_software, "ubuntu") === false);
    }

    private function getDbConnection(){
        if($this->isWindows()){
            require_once(dirname(__FILE__).'/../../vendorwin/autoload.php');
        } else {
            if ($this->isUbuntu()){
                require_once('/home/gmontero/vendor/autoload.php');
            } else {
                require_once('/home/admin/mongodbphp/vendor/autoload.php');
            }
        }

        try {
            $this->conn = new MongoDB\Client($this->connectionString);
        } catch(PDOException $exception){
            throw $exception;
        }

        return $this->conn->pwa;
    }

    public function insert($obj, $collection) {
        if(method_exists($obj, "getAsMongoModel")){
            $modelToInsert = $obj->getAsMongoModel();
            $insertId = $this->processInsert($this->conn->$collection->insertOne($modelToInsert));

            if($insertId !== null){
                $modelToInsert["_id"] = $insertId;
                return $modelToInsert;
            } else {
                return null;
            }
        } else {
            throw new Exception('Please, implement method getAsMongoModel');
        }
    }

    public function getAll($collection, $filter) {
        $result = $this->conn->$collection->find($filter)->toArray();
        $resultMapped = array_map(function($obj){
            $obj["_id"] = ((string) new MongoDB\BSON\ObjectId($obj["_id"]));
            return $obj;
        }, $result);
        return $resultMapped;
    }

    private function processInsert($insertResult){
        if ($insertResult->getInsertedCount() === 1) {
            return ((string) $insertResult->getInsertedId());
        } else {
            return null;
        }
    }

}

?>