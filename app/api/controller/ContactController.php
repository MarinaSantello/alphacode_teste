<?php

    class ContactController {

        private $contactModel;

        function __construct(){
            $this->contactModel = new Contact();
        }

        public function getAllContacts() {
            $data = $this->contactModel->getAll();

            if (!empty($data) && $data) {
                return [
                    "status" => 200,
                    "data" => $data
                ];
            } else {
                return [
                    "status" => 404,
                    "message" => 'Data not found.'
                ];
            }
        }

        public function getContactById($id) {
            if (!empty($id) && $id > 0) {
                $data = $this->contactModel->getById($id);
    
                if (!empty($data) && $data) {
                    return [
                        "status" => 200,
                        "data" => $data
                    ];
                } else {
                    return [
                        "status" => 404,
                        "message" => 'Data not found.'
                    ];
                }
            } else {
                return [
                    "status" => 400,
                    "message" => 'ID is required.'
                ];
            }
        }

        public function insertContact($obj) {
            if (!empty($obj['name']) || $obj['name'] != undefined || !empty($obj['birth_date']) || $obj['birth_date'] != undefined || !empty($obj['email']) || $obj['email'] != undefined || !empty($obj['cellphone']) || $obj['cellphone'] != undefined) {
                $data = $this->contactModel->insert($obj);

                if (!empty($data) && $data) {
                    return [
                        "status" => 201,
                        "message" => 'Successfully inserted contact.'
                    ];
                } else {
                    return [
                        "status" => 400,
                        "message" => 'Unable to insert contact.'
                    ];
                }
            } else {
                return [
                    "status" => 400,
                    "message" => 'Required fields were not sent.'
                ];
            }
        }

        public function deleteContact($id) {
            if (!empty($id) && $id > 0) {
                $data = $this->contactModel->delete($id);
    
                if ($data) {
                    return [
                        "status" => 200,
                        "data" => 'Successfully deleted contact.'
                    ];
                } else {
                    return [
                        "status" => 404,
                        "message" => 'Unable to delete contact.'
                    ];
                }
            } else {
                return [
                    "status" => 400,
                    "message" => 'ID is required.'
                ];
            }
        }

        public function updateContact($obj, $id) {
            if (!empty($id) && $id > 0) {
                $data = $this->contactModel->update($obj, $id);

                if ($data) {
                    return [
                        "status" => 200,
                        "message" => 'Successfully updated contact.'
                    ];
                } else {
                    return [
                        "status" => 400,
                        "message" => 'Unable to update contact.'
                    ];
                }
            } else {
                return [
                    "status" => 400,
                    "message" => 'ID is required.'
                ];
            }
        }
    }

?>