<?php
  include("../conexion.php");
  $pdo = conectarse();
    $data    = array();
    // recuper datos enviados
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $idNoticia  = $_GET['idNoticia'];
    //creo conexion y selecciono DB
    try {
        $stmt 	= $pdo->query("delete from dlp_noticas_fauna where idNoticia like '$idNoticia'");
        $data[] = "ok";
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     // retorno datos en JSON
     echo json_encode($data);
?>

