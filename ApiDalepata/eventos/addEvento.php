<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $municipio = $_POST["municipio"];
    $nombre	  = $_POST["nombre"];
    $des	  = $_POST["descripcion"];
    $fechaEvento = $_POST["fechaEvento"];
    $usuarioRegistro = $_POST["usuarioRegistro"];
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");   
    
    $upload_dir = 'img/';
        $server_url = 'http://localhost:8080/ApiDalelapata/eventos';

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

    try {
        $stmt 	= $pdo->query("insert into dlp_eventos_sads(municipio,nombre,descripcion,urlImagen,fechaEvento,estado,fechaRegistro,usuarioRegistro) 
        VALUES ('$municipio','$nombre','$des','$upload_name','$fechaEvento','Activo','$hoy','$usuarioRegistro')");
         $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

