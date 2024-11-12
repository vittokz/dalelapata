<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $nombre	  = $_POST["nombre"];
    $des	  = $_POST["descripcion"];
    $link	  = $_POST["link"];
    $identidadRegistra	  = $_POST["identidadRegistra"];

        /* $upload_dir = 'audios/';
        $server_url = 'http://localhost:8080/ApiDalelapata/podcast';

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
                $upload_name = strtolower($random_name);
             
             
                if(move_uploaded_file($avatar_tmp_name , "audios/".$avatar_name)) {
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
        } */



   
    try {
        $stmt 	= $pdo->query("insert into dlp_podcast(nombre,descripcion,url,estado,usuarioRegistro) 
        VALUES ('$nombre','$des','$link','Activo','$identidadRegistra')");
        $data[] = "ok";
       
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

