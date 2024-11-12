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
    $identidad	  = filter_var($obj->identidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idMascota	  = filter_var($obj->idMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
    $ban=0;
    $stmt = $pdo->query("select * from dlp_adopcion_postulaciones where identidad like '$identidad' and idMascota like '$idMascota'");
    while($row  = $stmt->fetch(PDO::FETCH_OBJ))
    {
        $ban=1;
    }
    if($ban==0){
            //recojo datos de mascota
            $stmt = $pdo->query("select * from dlp_mascota where idMascota like '$idMascota'");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                $nombreMascota= $row->nombre;
                $idFundacion= $row->idFundacion;
            }
            //fin datos mascota

            //recojo el correo del usuario
            $stmt = $pdo->query("select * from dlp_usuario where identidad like '$identidad'");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                $idUsuario = $row->idUsuario;
                $nombreUsuario = $row->nombres." ".$row->apellidos;
                $emailUsuario = $row->email;
            }
            //fin correo usuario
            
            //recojo el correo del fundacion
            $stmt = $pdo->query("select * from dlp_fundacion where idFundacion like '$idFundacion'");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
                $nombreFundacion = $row->razonSocial;
                $emailFundacion = $row->email;
                $movil = $row->movil;
            }
            //fin correo fundacion
            
            try {
                $stmt 	= $pdo->query("insert into dlp_adopcion_postulaciones(idUsuario,identidad,idMascota,idFundacion,idTipoRelacion,estadoPostulado,fechaRegistro) 
                VALUES ('$idUsuario','$identidad','$idMascota','$idFundacion','2','Postulado','$hoy')");
                $data["resul"] = "ok";
            
                $mail = new PHPMailer(true);
                    //Server settings
                /*    $mail->SMTPDebug = 0;                      // Enable verbose debug output
                    $mail->isSMTP();                                            // Send using SMTP
                    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                    $mail->Username   = 'vittoriocassetta@gmail.com';                     // SMTP username
                    $mail->Password   = 'Italiacamila03';                               // SMTP password
                    $mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
               */
                    //Recipients
                    $mail->setFrom('bienestaranimal@narino.gov.co', 'Plataforma Dale la Pata-Bienestar Animal');
                    $mail->addAddress($emailUsuario, 'Plataforma Dale la Pata');     // Add a recipient
                    $mail->addAddress('brisvanychavesn@gmail.com', 'Notificacion de Postulacion Plataforma Dale la Pata'); 
                    $mail->addCC($emailFundacion);
                    // Attachments
                    //enviar archivos e imagenes
                    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
                    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

                    // Content
                    //$mail足>AddAttachment("ruta/archivo_adjunto.gif");
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Postulacion por Mascota Dale la Pata';
                    $mail->Body    = 'Informacion de la Postulacion: <br>';
                    $mail->Body .= 'Saludos '.$nombreUsuario.' te has postulado para darle la pata a Mascota '.$nombreMascota.'
                    Puedes ver los detalles de la Mascota en el siguiente enlace <a href="https://dalelapata.narino.gov.co/#/detalleMascotaWeb/'.$idMascota.'">Ver mascota</a>. 
                    <br>La fundacion '.$nombreFundacion.' se comunicara con usted para continuar con el proceso de adopcion.
                    Detalles de la Fundacion en el siguiente enlace <a href="https://dalelapata.narino.gov.co/#/detalleUsuarioPag/'.$idMascota.'/'.$idFundacion.'">Ver Fundacion</a>.
                    <br><br>Gracias por tu apoyo.';
                    $mail->send();
                
                echo json_encode($data);
            }
            catch(PDOException $e)
            {
                echo $e->getMessage();
            }
       
    }
    else{
        $data["resul"] = "error";
        echo json_encode($data);
    }     
?>



