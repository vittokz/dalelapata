<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $idMascota     =  filter_var($obj->idMascota,FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");  
    
    try {
        $stmt 	= $pdo->query("update dlp_mascota set estadoMascota='Eliminado', estado='Eliminado' where idMascota like '$idMascota'");
        $data["resul"]= $stmt->rowCount();
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

