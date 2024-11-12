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
    $nombre     =  $_POST["nombre"];
    $descripcion  =  $_POST["descripcion"];
    $fecha  = $_POST["fecha"];
    $estado  = $_POST["estado"];
    $estadoMascota  = $_POST["estadoMascota"];
    $idMascota	  = $_POST["idMascota"];
    $idUsuario    =  $_POST["idUsuario"];

    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d");         
   
         $upload_dir = 'img';
         $server_url = 'img';
         if (!file_exists($server_url)) {
            mkdir($server_url, 0777, true);
         }
        

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
                $upload_name = $idMascota.$avatar_name;
            
                if(move_uploaded_file($avatar_tmp_name , "img/".$upload_name)) {
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


    try {
        $stmt 	= $pdo->query("INSERT INTO dlp_adopcion_logros(nombre,idMascota,idUsuario,estado,descripcion,estadoMascota,img,fecha) 
        VALUES ('$nombre','$idMascota','$idUsuario','$estado','$descripcion','$estadoMascota','$upload_name','$fecha')");
        $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

