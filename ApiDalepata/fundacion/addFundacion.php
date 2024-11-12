<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);

    $tipoDoc    = $_POST["tipoDoc"];
    $identidad  = $_POST["identidad"];
    $razon    = $_POST["razon"];
    $municipio  = $_POST["municipio"];
    $ccResponsable  = $_POST["ccResponsable"];
    $nomResponsable  = $_POST["nomResponsable"];
    $telefono  = $_POST["telefono"];
    $movil  = $_POST["movil"];
    $email  = $_POST["email"];
    $direccion  = $_POST["direccion"];
    $fecha  = "";
    $descripcion  = "";
    $clave  = $_POST["clave"];
    $facebook  = $_POST["facebook"];
    $twitter  = $_POST["twitter"];
   
    
    //verifico q no exista la misma identidad y correo
   $cantidad=0;
   $stmt 	= $pdo->query("SELECT * FROM dlp_fundacion where identidad like '$identidad' or email like '$email'");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
      $cantidad=1;
   }

   if($cantidad==0){

            date_default_timezone_set('America/Bogota');
            $hoy = date("Y-m-d g:i a"); 

            $upload_dir = 'img';
            $server_url = 'img';
            if (!file_exists($server_url)) {
                mkdir($server_url, 0777, true);
            }
       
            //subir logo

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
                    $upload_name = $identidad.$avatar_name;
                
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

            //fin subir logo


        
            
            $clave = password_hash($clave, PASSWORD_DEFAULT, ['cost'=>10]);
            
            try {
                $stmt 	= $pdo->query("insert into dlp_fundacion(idtipoFundacion,tipoDoc,identidad,municipio,
                clave,razonSocial,ccResponsable,nombreResponsable,logo,descripcion,telefono,movil,direccion,email,
                facebook,twitter,fechaFundacion,fechaRegistro,usuarioRegistro,estado)VALUES ('no','$tipoDoc',
                '$identidad','$municipio','$clave','$razon','$ccResponsable','$nomResponsable','$avatar_name','$descripcion',
                '$telefono','$movil','$direccion','$email','$facebook','$twitter','$fecha','$hoy','$identidad','Activo')");

                $stmt 	= $pdo->query("select idFundacion from dlp_fundacion where identidad like '$identidad'");
                while($row  = $stmt->fetch(PDO::FETCH_OBJ))
                    {
                        $idFundacion = $row->idFundacion;
                    }

                $stmt 	= $pdo->query("insert into dlp_usuario(nomUsuario,idFundacion,tipoDoc,identidad,idCiudad,
                nombres,apellidos,fotoPerfil,direccion,rolUsuario,telefono,movil,clave,email,facebook,twitter,
                fechaRegistro,usuarioRegistra,estado)VALUES ('$email','$idFundacion','$tipoDoc','$identidad',
                '$municipio','$razon','','no','$direccion','no','$telefono','$movil','$clave','$email',
                'no','no','$hoy','no','Activo')");

                $data["resul"]= $stmt->rowCount();
                // retorno datos en JSON
            }
            catch(PDOException $e)
            {
                echo $e->getMessage();
            }
    }

    if($cantidad>0){
        $data["resul"]= 0;
     }
     echo json_encode($data);
?>


