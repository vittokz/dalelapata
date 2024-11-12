<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
 
    $nombre	  = $_POST["nombre"];
    $des	  = $_POST["descripcion"];
    $tipo	  = $_POST["tipo"];
 
        $upload_dir = 'img/';
        $server_url = 'img/';
        if (!file_exists($server_url)) {
            mkdir($server_url, 0777, true);
         }
        //subir banner pagina home
        
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
                
                $upload_name = $upload_dir.$random_name;
                $upload_name = ($upload_name);
            
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
        //subir archivo donde se redirijira
        if($tipo=="Banner-Archivo"){
            $tipo="Banner";
           
            $upload_dir = '../../archivos/home/';
            $server_url = '../../archivos/home/';
            if($_FILES['avatar2'])
            {
                $avatar_name = $_FILES["avatar2"]["name"];
                $avatar_tmp_name = $_FILES["avatar2"]["tmp_name"];
                $error = $_FILES["avatar2"]["error"];
                $des = $des.$avatar_name;
                if($error > 0){
                    $response = array(
                        "status" => "error",
                        "error" => true,
                        "message" => "Error uploading the file!"
                    );
                }else 
                {
                    $upload_name = $upload_dir.$avatar_name;
                    $upload_name = ($upload_name);
                
                    if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
                        $response = array(
                            "status" => "success",
                            "error" => false,
                            "message" => "File uploaded successfully",
                            "url" => $server_url.$upload_name
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
                    "message" => "No file2 was sent!"
                );
            }

        }
       

    try {
        $stmt 	= $pdo->query("insert into dlp_banner(nombre,tipo,descripcion,imagen,estado) 
        VALUES ('$nombre','$tipo','$des','$random_name','Activo')");
         $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

