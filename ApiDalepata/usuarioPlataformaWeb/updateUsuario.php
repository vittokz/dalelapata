<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $idUsuario  = filter_var($obj->idUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idFundacion   = filter_var($obj->idFundacion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $tipoDoc    = filter_var($obj->tipoDoc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $identidad  = filter_var($obj->identidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombres    = filter_var($obj->nombres, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $apellidos  = filter_var($obj->apellidos, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $direccion  = filter_var($obj->direccion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $telefono  = filter_var($obj->telefono, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $movil  = filter_var($obj->movil, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $email  = filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $facebook  = filter_var($obj->facebook, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $twitter  = filter_var($obj->twitter, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $clave  = filter_var($obj->clave, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $clave = password_hash($clave, PASSWORD_DEFAULT, ['cost'=>10]);
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
    try {
        $stmt 	= $pdo->query("update dlp_usuario set direccion='$direccion',telefono='$telefono',movil='$movil',email='$email',facebook='$facebook',twitter='$twitter', clave='$clave' where idUsuario like '$idUsuario'");
        $data["resul"]= $stmt->rowCount();
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>
