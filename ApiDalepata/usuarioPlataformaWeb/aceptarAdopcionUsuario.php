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
    $idUsuario	  = filter_var($obj->idUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idMascota	  = filter_var($obj->idMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
         
            try {
                //actualizo esto del postulante a aceptado
                $stmt 	= $pdo->query("UPDATE dlp_adopcion_postulaciones set idTipoRelacion='1',estadoPostulado='Aceptado',fechaAceptado='$hoy',estadoContrato='Pendiente' where idUsuario like '$idUsuario' and idMascota like '$idMascota'");
                
                //actualizo los estados de los no acpetados a rechazados
                $stmt 	= $pdo->query("UPDATE dlp_adopcion_postulaciones set idTipoRelacion='1',estadoPostulado='Rechazado',fechaAceptado='$hoy' where idMascota like '$idMascota' and idUsuario <> '$idUsuario'");
                
                //actualizo el estado de mascota a adoptado en tabla mascotas
                $stmt 	= $pdo->query("UPDATE dlp_mascota set estadoMascota='1',fechaAdopcion='$hoy' where idMascota like '$idMascota'");
               
                 $stmt = $pdo->query("select * from dlp_usuario where idUsuario like '$idUsuario'");
                    while($row  = $stmt->fetch(PDO::FETCH_OBJ))
                    {
                        $identidad = $row->identidad;
                        $nombreUsuario = $row->nombres." ".$row->apellidos;
                        $emailUsuario = $row->email;
                    }

                    $stmt = $pdo->query("select * from dlp_mascota where idMascota like '$idMascota'");
                        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
                        {
                            $nombreMascota= $row->nombre;
                         }

                   $mail = new PHPMailer(true);
                      //Recipients
                    $mail->setFrom('bienestaranimal@narino.gov.co', 'Plataforma Dale la Pata-Bienestar Animal');
                    $mail->addAddress($emailUsuario, 'Plataforma Dale la Pata');     // Add a recipient
                    $mail->addAddress('brisvanychavesn@gmail.com', 'Notificacion de Aceptacion Adopcion Plataforma Dale la Pata'); 
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Aceptaci&oacute;n Para Adopci&oacute;n Mascota Dale la Pata';
                    $mail->Body    = 'Informacion de la Adopci&oacute;n <br>';
                    $mail->Body .= 'Saludos '.$nombreUsuario.' has adoptado a la Mascota '.$nombreMascota.'
                    Puedes ver los detalles de la Mascota en el siguiente enlace <a href="http://dalelapata.narino.gov.co/#/detalleMascotaWeb/'.$idMascota.'">Ver mascota</a>.<br>
                    Ten en cuenta que cada treinta dias recibira una notificacion en su email, donde debe subir una evidencia 
                    de como se encuentra nuestro amigo de cuatro patas, una foto que evidencia alguna vivencia. <br>
                    Puede subir dicha informacion por el siguiente enlace.
                     <a href="http://dalelapata.narino.gov.co/#/agregarLogro/'.$idMascota.'/'.$idUsuario.'">Subir vivencia</a>.  
                    <br>
                    <br><br>Gracias por tu apoyo.';
                    $mail->send();
               $data["resul"]= 1;
            }catch(PDOException $e)
            {
                echo $e->getMessage();
            }
        echo json_encode($data);     
?>

