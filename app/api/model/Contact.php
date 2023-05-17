<?php

    class Contact {

        protected $campos;
        protected $connection;
        protected $sql;

        public function __construct() {
            $this->connection = (new Connection())->connect();
        }

        public function getAll() {
            try {
                $this->sql = "SELECT * FROM tbl_contact";

                $db_process = $this->connection->prepare($this->sql);
                $db_process->execute();

                return $db_process->fetchAll(\PDO::FETCH_OBJ);
            } catch (Exception $ex) {
                echo "Connection error: " . $ex->getTraceAsString();
            }
        }

        public function getById($id) {
            try {
                $this->sql = "SELECT * FROM tbl_contact WHERE id = $id";

                $db_process = $this->connection->prepare($this->sql);
                $db_process->execute();

                return $db_process->fetchAll(\PDO::FETCH_OBJ);
            } catch (Exception $ex) {
                echo "Connection error: " . $ex->getTraceAsString();
            }
        }

        public function insert($obj) {
            try {
                $values = ':' . implode(', :', array_keys($obj));

                $this->sql = "INSERT INTO tbl_contact (
                    name,
                    birth_date,
                    email,
                    profession,
                    phone,
                    cellphone,
                    checked_wpp,
                    checked_sms,
                    checked_email
                ) VALUES (
                    $values
                )";

                $db_process = $this->connection->prepare($this->sql);

                foreach ($obj as $key => $value) {
                    if($value === "") {
                        $value = null;
                    }

                    $db_process->bindValue(":$key", "$value");
                }

                $db_process->execute();

                return $db_process->rowCount();
            } catch (Exception $ex) {
                echo "Connection error: a" . $ex->getTraceAsString();
            }
        }

        public function delete($id) {
            try {
                $this->sql = "DELETE FROM tbl_contact WHERE id = $id";

                $db_process = $this->connection->prepare($this->sql);
                $db_process->execute();

                return $db_process->rowCount();
            } catch (Exception $ex) {
                echo "Connection error: " . $ex->getTraceAsString();
            }
        }

        public function update($obj, $id) {
            try {
                foreach ($obj as $key => $value) {
                    $columns .= "$key = :$key, ";
                }

                $columns = rtrim($columns, ", ");

                $this->sql = "UPDATE tbl_contact SET $columns WHERE id = $id";

                $db_process = $this->connection->prepare($this->sql);

                foreach ($obj as $key => $value) {
                    if($value === "") {
                        $value = null;
                    }

                    $db_process->bindValue(":$key", "$value");
                }

                $db_process->execute();

                return $db_process->rowCount();
            } catch (Exception $ex) {
                echo "Connection error: " . $ex->getTraceAsString();
            }
        }
    }

?>