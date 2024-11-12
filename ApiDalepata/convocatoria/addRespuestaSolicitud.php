<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $comentarios  = filter_var($obj->comentarios, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idSolicitud   = filter_var($obj->idSolicitud, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $estado  = filter_var($obj->estado, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $usuarioComento  = filter_var($obj->usuarioComento, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    
  
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
    try {
        $stmt 	= $pdo->query("update dlp_convocatorias set 
        comentario='$comentarios',estado='$estado',usuarioComento='$usuarioComento',fechaComentario='$hoy' where idSolicitud like '$idSolicitud'");
        $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>
