<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $fecha  = filter_var($obj->fecha, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $fecha2  = filter_var($obj->fecha2, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nit  = filter_var($obj->nit, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $usuarioRegistro   = filter_var($obj->usuarioRegistro, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
  
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
    try {
        $stmt 	= $pdo->query("update dlp_solicitudes_visitas set fechaVisitaProgramada = '$fecha', fechaVisitaProgramadaFin = '$fecha2',
        fechaRegistroVisita = '$hoy',usuarioRegistroFechaVisita='$usuarioRegistro' where usuarioRegistro like '$nit'");
        $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>
