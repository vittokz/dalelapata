<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    
  
    $idLogro =  filter_var($obj->idLogro, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

    try {
        $stmt 	= $pdo->query("UPDATE dlp_adopcion_logros set estado ='Eliminado' where idLogro like '$idLogro'");
        $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

