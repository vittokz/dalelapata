<?php
  include("../conexion.php");
  $pdo = conectarse();
    $data    = array();
    // recuper datos enviados
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $idPodcast  = $_GET['id'];
    //creo conexion y selecciono DB
    try {
        $stmt 	= $pdo->query("delete from dlp_podcast where id like '$idPodcast'");
        $data[] = "ok";
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     // retorno datos en JSON
     echo json_encode($data);
?>
