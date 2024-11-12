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
    
    $idFundacion	  = $_GET["idFundacion"];
 
    try {
        $stmt 	= $pdo->query("SELECT p.idMascota,p.idRelacion,p.fechaAceptado, u.* FROM dlp_adopcion_postulaciones p, dlp_usuario u
         WHERE p.idFundacion like '$idFundacion' and p.estadoContrato like 'subido' and p.identidad like u.identidad 
        order by p.fechaContratoUpload DESC");
       while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        {       
               $mail = new PHPMailer(true);
               //Recipients
               $mail->setFrom('dalelapatasads@gmail.com', 'Plataforma Dale la Pata-Bienestar Animal');
               $mail->addAddress($row->email, 'Plataforma Dale la Pata');     // Add a recipient
               $mail->addAddress('bienestaranimal@narino.gov.co', 'Recordatorio Notificacion envio foto evidencia de mascota'); 
               $mail->isHTML(true);                                  // Set email format to HTML
               $mail->Subject = 'Solicitud Evidencia Mascota - Dale la pata- Bienestar Animal';
               $mail->Body    = '';
               $mail->Body .= 'Saludos '.$row->nombres.' '.$row->apellidos.' 
               Se envia notificacion de recordatorio  para el envio de evidencia 
               de como se encuentra nuestro amigo de cuatro patas, una foto que demuestre alguna vivencia. <br>
               Puede subir dicha informacion por el siguiente enlace.
               <a href="https://dalelapata.narino.gov.co/#/agregarLogro/'.$row->idMascota.'/'.$row->idUsuario.'">Subir vivencia</a>.  
               <br>
               <br><br>Si ya envio la evidencia por favor hacer caso omiso al mensaje, <br>Gracias por tu apoyo.';
               $mail->send();
               $data[]= 1;           
        }
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

