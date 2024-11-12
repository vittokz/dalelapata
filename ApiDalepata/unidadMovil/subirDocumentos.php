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
   
    $municipio = $_POST["idMunicipio"];
    $tipoArchivo = $_POST["tipoArchivo"];
    $usuarioRegistro = $_POST["usuarioRegistro"];
    $stmt 	= $pdo->query("SELECT nombre FROM dlp_ciudades WHERE id like '$municipio'");
    while($row  = $stmt->fetch(PDO::FETCH_OBJ))
         {
              $nomMunicipio = $row->nombre;
         }

  
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");   
    
    
        $upload_dir = 'documentos/'.$usuarioRegistro;
        $server_url = 'documentos/'.$usuarioRegistro;
        if (!file_exists($server_url)) {
           mkdir($server_url, 0777, true);
        }
  
          if($_FILES['file1'])
          {
              $file1_name = $_FILES["file1"]["name"];
              $file1_tmp_name = $_FILES["file1"]["tmp_name"];
              $error = $_FILES["file1"]["error"];
  
              if($error > 0){
                  $response = array(
                      "status" => "error",
                      "error" => true,

                      "message" => "Error uploading the file!"
                  );
              }else 
              {
                  $random_name = rand(1000,1000000)."-".$file1_name;
                  $file1upload_name = $file1_name;
           
              
                  if(move_uploaded_file($file1_tmp_name , "documentos/".$usuarioRegistro."/".$file1upload_name)) {
                      $response = array(
                          "status" => "success",
                          "error" => false,
                          "message" => "File uploaded successfully",
                          "url" => $server_url."/".$file1upload_name
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
    try {
        if($tipoArchivo==1){
            $stmt 	= $pdo->query("INSERT INTO dlp_solicitudes_visitas(tipoArchivo,nombreArchivo,idMunicipio,estado,usuarioRegistro) 
            VALUES ('Formato carta de compromiso','$file1upload_name','$municipio','Pendiente','$usuarioRegistro')");
            $data["resul"]= $stmt->rowCount();
        }
        if($tipoArchivo==2){
            $stmt 	= $pdo->query("INSERT INTO dlp_solicitudes_visitas(tipoArchivo,nombreArchivo,idMunicipio,estado,usuarioRegistro) 
            VALUES ('Formato Censo excel','$file1upload_name','$municipio','Pendiente','$usuarioRegistro')");
            $data["resul"]= $stmt->rowCount();
        }
        if($tipoArchivo==3){
            $stmt 	= $pdo->query("INSERT INTO dlp_solicitudes_visitas(tipoArchivo,nombreArchivo,idMunicipio,estado,usuarioRegistro) 
            VALUES ('Modelo Certificado','$file1upload_name','$municipio','Pendiente','$usuarioRegistro')");
            $data["resul"]= $stmt->rowCount();
         }
         if($tipoArchivo==4){
            $stmt 	= $pdo->query("INSERT INTO dlp_solicitudes_visitas(tipoArchivo,nombreArchivo,idMunicipio,estado,usuarioRegistro) 
            VALUES ('Rut','$file1upload_name','$municipio','Pendiente','$usuarioRegistro')");
            $data["resul"]= $stmt->rowCount();
         }
         if($tipoArchivo==5){
            $stmt 	= $pdo->query("INSERT INTO dlp_solicitudes_visitas(tipoArchivo,nombreArchivo,idMunicipio,estado,usuarioRegistro) 
            VALUES ('Otro tipo de documento','$file1upload_name','$municipio','Pendiente','$usuarioRegistro')");
            $data["resul"]= $stmt->rowCount();
         }
         if($tipoArchivo==6){
            $stmt 	= $pdo->query("INSERT INTO dlp_solicitudes_visitas(tipoArchivo,nombreArchivo,idMunicipio,estado,usuarioRegistro) 
            VALUES ('CDP','$file1upload_name','$municipio','Pendiente','$usuarioRegistro')");
            $data["resul"]= $stmt->rowCount();
        }
                    $mail = new PHPMailer(true);
                      //Recipients
                    $mail->setFrom('dalelapata2021@gmail.com', 'Plataforma DalelaPata-Bienestar Animal');
                    $mail->addAddress('bienestaranimal@narino.gov.co', 'Bienestar animal'); 
                    $mail->addAddress('dalelapata2021@gmail.com', 'Dalelapata');
               
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Notificacion de Solicitud unidad movil';
                    $mail->Body    = 'Informacion de la solicitud <br>';
                    $mail->Body .= 'Se realiza solicitud del modulo de unidad movil del municipio '.$nomMunicipio.'<br><br>
                    Gracias por tu apoyo.';
                    $mail->send();
        
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

																																																																							