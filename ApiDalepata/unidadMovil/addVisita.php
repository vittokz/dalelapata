<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    
    $idMunicipio     =  filter_var($obj->idMunicipio,FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $latitud  = filter_var($obj->latitud, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $longitud	  = filter_var($obj->longitud, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $proceso     =  filter_var($obj->proceso, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $fechaInicial  = filter_var($obj->fechaInicial, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $fechaFinal	  = filter_var($obj->fechaFinal, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $cantidad     =  filter_var($obj->cantidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $estado  = filter_var($obj->estado, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $usuarioRegistro  = filter_var($obj->usuarioRegistro, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d");         
   
    try {
        $stmt 	= $pdo->query("INSERT INTO dlp_mapa_visitas(idMunicipio,latitud,longitud,cantidad,proceso,fechaInicial,fechaFinal,estado,fechaRegistro,usuarioRegistro) 
        VALUES ('$idMunicipio','$latitud','$longitud','$cantidad','$proceso','$fechaInicial','$fechaFinal','$estado','$hoy','$usuarioRegistro')");
        $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

