<?php

    class Connection {

        private $db = "mysql";
        private $host = "localhost";
        private $port = "3306";
        private $db_name = "alphacode_database";
        private $user = "root";
        private $password = "santello";
        private $charset = "utf8mb4";
        private $connection;

        public function __construct(){
        }

        public function connect() {
            try {
                $url = "{$this->db}:host={$this->host}:{$this->port};dbname={$this->db_name};charset={$this->charset}";
                
                $this->connection = new PDO($url, $this->user, $this->password);

                return $this->connection;
            } catch (Exception $ex) {
                echo "Connection error: " . $ex->getTraceAsString();
            }
            
        }

    }

?>