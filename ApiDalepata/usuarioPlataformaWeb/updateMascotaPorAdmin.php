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
    $idMascota	  = filter_var($obj->idMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idFundacion	  = filter_var($obj->idFundacion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $chip	  = filter_var($obj->chip, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombre	  = filter_var($obj->nombre, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $edad	  = filter_var($obj->edad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idRaza	  = filter_var($obj->idRaza, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idEspecie	  = filter_var($obj->idEspecie, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idGenero = filter_var($obj->idGenero, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $tamano	  = filter_var($obj->tamano, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $peso	  = filter_var($obj->peso, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $ciudad	  = filter_var($obj->ciudad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $estadoMascota	  = filter_var($obj->estadoMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $color	  = filter_var($obj->color, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $usuarioEdito	  = filter_var($obj->usuarioEdito, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $descripcion	  = filter_var($obj->descripcion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    
   date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
    try {
        $stmt 	= $pdo->query("UPDATE dlp_mascota set numChip='$chip',idFundacion='$idFundacion',
        nombre='$nombre', edad='$edad', descripcion='$descripcion', idRaza='$idRaza',
        idEspecie='$idEspecie', idGenero='$idGenero', tamano='$tamano', estadoMascota='$estadoMascota',
        peso='$peso',ciudad='$ciudad',color='$color',fechaEdicion='$hoy',usuarioEdito='$usuarioEdito'
        where idMascota like '$idMascota'");
       
       $mail = new PHPMailer(true);
       //Recipients
         $mail->setFrom('dalelapatasads@gmail.com', 'Plataforma Dale la Pata-Bienestar Animal');
        $mail->addAddress($emailUsuario, 'Plataforma Dale la Pata');     // Add a recipient
        $mail->addAddress('bienestaranimal@narino.gov.co', 'Notificacion Actualizacion de datos mascota'); 
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Actualizaci&oacute;n de datos Mascota Plataforma dale la Pata';
        $mail->Body    = 'Se comunica que se realiz&oacute; correctamente la actualizaci&oacute;n de datos de Mascota. <br>';
        $mail->Body .= 'Saludos, los datos son los siguientes <br>
        Nombre: '.$nombre.'<br>
        Edad: '.$edad.'<br>
        Especie: '.$idEspecie.' <br>
        Genero: '.$idGenero.'<br>
        Tamaño : '.$tamano.'<br>
        Peso: '.$Peso.'<br>
        Estado Mascota: '.$estadoMascota.'<br>
        Color: '.$color.'<br>
        Descripci&oacute;n: '.$descripcion.'<br>
        <br><br>Gracias por tu apoyo.';
        $mail->send();
        //$stmt->execute();
        $data["resul"]= $stmt->rowCount();
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

