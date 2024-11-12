<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpMailer/Exception.php';
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';

$mail = new PHPMailer(true);
try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'vittoriocassetta@gmail.com';                     // SMTP username
    $mail->Password   = 'Italiacamila03';                               // SMTP password
    $mail->SMTPSecure = tls;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('vittoriocassetta@gmail.com', 'Plataforma Dale la Pata');
    $mail->addAddress('vittorio15@hotmail.com', 'Plataforma Dale la Pata');     // Add a recipient
    // Attachments
    //enviar archivos e imagenes
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'plataforma 16 de mayo  ';
    $mail->Body    = 'Mensaje de prueba<b> gracias</b>';
    $mail->AltBody = 'mensaje alternativo';

    $mail->send();
    echo 'mensaje enviado correctamente';
} catch (Exception $e) {
    echo "Hubo error al enviar mensaje: {$mail->ErrorInfo}";
}

?>
