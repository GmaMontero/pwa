<?php
/**
 * Created by IntelliJ IDEA.
 * User: gmontero
 * Date: 19/05/19
 * Time: 18:46
 */
function getDbConnection(){
    $isWindows = false;

    if(strcasecmp(substr(PHP_OS, 0, 3), 'WIN') == 0){
        $isWindows = true;
    }

    if($isWindows){
        require_once('vendorwin/autoload.php');
    } else {
        $server_software = strtolower($_SERVER['SERVER_SOFTWARE']);
        if (strpos($server_software, "ubuntu") === false){
            require_once('/home/admin/mongodbphp/vendor/autoload.php');
        } else {
            require_once('/home/gmontero/vendor/autoload.php');
        }
    }

    $client = new MongoDB\Client("mongodb://pwa:Trend123@pwa-web.tk:27017/pwa");
    return $client->pwa;
}
