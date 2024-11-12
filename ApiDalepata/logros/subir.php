<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    
    /*
    $nombre     =  filter_var($obj->nombre,FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $descripcion    =  filter_var($obj->descripcion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $fecha  = filter_var($obj->fecha, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $estado  = filter_var($obj->estado, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $estadoMascota  = filter_var($obj->estadoMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idMascota	  = filter_var($obj->idMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idUsuario    =  filter_var($obj->idUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    */
   
    $upload_dir = 'img/';
        $server_url = 'http://localhost:8080/ApiDalelapata/logros';

        if($_FILES['avatar'])
        {
            $avatar_name = $_FILES["avatar"]["name"];
            $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
            $error = $_FILES["avatar"]["error"];

            if($error > 0){
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }else 
            {
                $random_name = rand(1000,1000000)."-".$avatar_name;
                $upload_name = $upload_dir.strtolower($random_name);
                $upload_name = preg_replace('/\s+/', '-', $upload_name);
            
                if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
                    $response = array(
                        "status" => "success",
                        "error" => false,
                        "message" => "File uploaded successfully",
                        "url" => $server_url."/".$upload_name
                    );
                }else
                {
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "Error uploading the file!"
                    );
                }
            }    
        }else{
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "No file was sent!"
            );
        }
       $data["resul"]= $stmt->rowCount();
     echo json_encode($data);
?>

