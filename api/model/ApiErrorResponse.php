<?php
/**
 * Created by IntelliJ IDEA.
 * User: gmontero
 * Date: 19/05/19
 * Time: 23:50
 */

class ApiResponse
{
    public $error;
    public $content;

    public function __construct($content, $errorDescription){
        if(is_null($content)){
            $this->error = $errorDescription;
        } else {
            $this->content = $content;
        }

    }

    public function __toString(){
        return json_encode((object) array_filter((array) $this));
    }
}