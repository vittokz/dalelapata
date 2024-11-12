<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    
    $idenUsuario	  = $_POST["idenUsuario"];
 
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
   
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
                $upload_name = $avatar_name;
            
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
        $stmt 	= $pdo->query("UPDATE dlp_adopcion_postulaciones set estadoContrato='Subido', 
        fechaContratoUpload='$hoy', archivoContrato='$upload_name' WHERE identidad like '$idenUsuario'");
        $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

