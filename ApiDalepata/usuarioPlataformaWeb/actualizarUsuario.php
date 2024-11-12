<?php
    include("../conexion.php");
   //  use PHPMailer\PHPMailer\PHPMailer;
   //  use PHPMailer\PHPMailer\Exception;

   //  require '../phpMailer/Exception.php';
   //  require '../phpMailer/PHPMailer.php';
   //  require '../phpMailer/SMTP.php';

    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $identidad  = filter_var($obj->identidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombres    = filter_var($obj->nombres, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $apellidos  = filter_var($obj->apellidos, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $direccion  = filter_var($obj->direccion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $telefono  = filter_var($obj->telefono, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $movil  = filter_var($obj->movil, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $email  = filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $clave  = filter_var($obj->clave, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    $clave = password_hash($clave, PASSWORD_DEFAULT, ['cost'=>10]);
      
    try {
        $stmt 	= $pdo->query("update dlp_usuario set nombres='$nombres', apellidos='$apellidos',direccion='$direccion',telefono='$telefono',
        movil='$movil',clave='$clave',email='$email' where identidad like '$identidad'");
     //    $mail = new PHPMailer(true);
        //Recipients
     /*    
          $mail->setFrom('dalelapatasads@gmail.com', 'Plataforma Dale la Pata-Bienestar Animal');
         $mail->addAddress($email, 'Plataforma Dale la Pata');     // Add a recipient
         $mail->isHTML(true);                                  // Set email format to HTML
         $mail->Subject = 'Actualizacion de datos Plataforma dale la Pata';
         $mail->Body    = '<h3>Se comunica que se realiz&oacute; correctamente la actualizaci&oacute;n de datos.</h3> <br>';
         $mail->Body .= 'Sus datos personales son los siguientes <br>
         Nombres: '.$nombres.' '.$apellidos.'<br>
         Identificaci&oacute;n: '.$identidad.'<br>
         Direcci&oacute;n: '.$direccion.' <br>
         Telefono: '.$telefono.'<br>
         Celular : '.$movil.'<br>
         Email: '.$email.'<br>
         <br><h3>Gracias por tu apoyo.</h3>';
         $mail->send();
    */
         $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>
