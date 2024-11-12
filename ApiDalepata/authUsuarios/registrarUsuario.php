<?php
    include("../conexion.php");
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '../phpMailer/Exception.php';
    require '../phpMailer/PHPMailer.php';
    require '../phpMailer/SMTP.php';
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $tipoDoc	  = filter_var($obj->tipoDoc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $tipoUsuario	  = filter_var($obj->tipoUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $identidad	  = filter_var($obj->identidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombre	  = filter_var($obj->nombre, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $apellido	  = filter_var($obj->apellido, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $email	  = filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $telefono	  = filter_var($obj->telefono, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $direccion	  = filter_var($obj->direccion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $municipio	  = filter_var($obj->municipio, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $clave	  = filter_var($obj->clave, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $auxClave = $clave;
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
   
    //verifico q no exista la misma identidad y correo
   $cantidad=0;
   $stmt 	= $pdo->query("SELECT * FROM dlp_usuarios_sistema where identidad like '$identidad' or email like '$email'");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
      $cantidad=1;
   }

   if($cantidad==0){
        $clave = password_hash($clave, PASSWORD_DEFAULT, ['cost'=>10]);
            try {
                $stmt 	= $pdo->query("insert into dlp_usuarios_sistema(tipoDoc,tipoUsuario,municipio,identidad,nombre,apellido,email,telefono,
                direccion,clave,facebook,estado,fechaRegistro,usuarioRegistro)
                VALUES('$tipoDoc','$tipoUsuario','$municipio','$identidad','$nombre','$apellido','$email','$telefono','$direccion','$clave','no',
                'Activo','$hoy','no')");
                $data["resul"]= $stmt->rowCount();
                $mail = new PHPMailer(true);
                      //Recipients
                    $mail->setFrom('dalelapatasads@gmail.com', 'Plataforma DalelaPata-Bienestar Animal');
                    $mail->addAddress($email, 'Creacion de usuario-Bienestar animal'); 
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Notificacion de Creacion  de usuario';
                    $mail->Body    = 'Nuevo usuario <br>';
                    $mail->Body .= 'Se asignan credenciales de acceso a la plataforma de administracion Dale la pata,
                     de la siguiente manera.<br><br> Identidad:'.$identidad.'<br> clave: '.$auxClave.'<br><br> Gracias.';
                    $mail->send();
                
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

