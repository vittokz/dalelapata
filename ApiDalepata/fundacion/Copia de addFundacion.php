<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $tipoDoc    = filter_var($obj->tipoDoc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $identidad  = filter_var($obj->identidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $razon    = filter_var($obj->razon, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $municipio  = filter_var($obj->municipio, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $ccResponsable  = filter_var($obj->ccResponsable, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nomResponsable  = filter_var($obj->nomResponsable, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $telefono  = filter_var($obj->telefono, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $movil  = filter_var($obj->movil, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $email  = filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $direccion  = filter_var($obj->direccion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $fecha  = filter_var($obj->fecha, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $descripcion  = filter_var($obj->descripcion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $clave  = filter_var($obj->clave, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $facebook  = filter_var($obj->facebook, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $twitter  = filter_var($obj->twitter, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   
    
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
            
            $clave = password_hash($clave, PASSWORD_DEFAULT, ['cost'=>10]);
            
            try {
                $stmt 	= $pdo->query("insert into dlp_fundacion(idtipoFundacion,tipoDoc,identidad,municipio,
                clave,razonSocial,ccResponsable,nombreResponsable,logo,descripcion,telefono,movil,direccion,email,
                facebook,twitter,fechaFundacion,fechaRegistro,usuarioRegistro,estado)VALUES ('no','$tipoDoc',
                '$identidad','$municipio','$clave','$razon','$ccResponsable','$nomResponsable','no','$descripcion',
                '$telefono','$movil','$direccion','$email','$facebook','$twitter','$fecha','$hoy','no','Activo')");

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


