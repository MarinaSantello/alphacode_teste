<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Content-Type: applicatiopn/json");
    header("Content-Type: text/html; charset=iso-8859-1");

    require_once("./Connection.php");
    require_once("./model/Contact.php");
    require_once("./controller/ContactController.php");


    class ContactRouter {

        private $method;
        private $contactController;
        private $idContact;
        private $contentData;

        function __construct(){
            $this->contactController = new ContactController();

            $this->method = $_SERVER["REQUEST_METHOD"];
            $this->idContact = $_GET["id"] ?? null;
            $this->contentData = file_get_contents('php://input');
        }

        function router(){

            switch ($this->method) {
                case "GET":
                    if(isset($this->idContact)) return $this->contactController->getContactById($this->idContact);

                    else return $this->contactController->getAllContacts();
                break;
                
                case "POST":
                    $decodeData = json_decode($this->contentData, true);

                    return $this->contactController->insertContact($decodeData);
                break;

                case "PUT";
                    $decodeData = json_decode($this->contentData, true);

                    if(isset($this->idContact)) return $this->contactController->updateContact($decodeData, $this->idContact);
                break;
                
                case "DELETE":
                    return $this->contactController->deleteContact($this->idContact);
                break;
            
                default:
                    return "Unsupported method.";
                break;
            }
        }
    }
    
    $connection = new ContactRouter();
    $data = $connection->router();
    echo json_encode($data);
?>