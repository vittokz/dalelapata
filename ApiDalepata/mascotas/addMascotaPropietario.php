
<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
   
    $idMascota = $_POST["idMascota"];
    $nombres = $_POST["nombres"]; 
    $apellidos = $_POST["apellidos"]; 
    $email = $_POST["email"]; 
    $movil = $_POST["movil"]; 

    try {
         $stmt 	= $pdo->query("INSERT INTO dlp_mascota_propietario (idMascota,identidad,nombres,apellidos,email,movil) VALUES 
         ('$idMascota','1','$nombres','$apellidos','$email','$movil') ");   
         $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>
