<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$idVisita = $_GET["idVisita"];
$posicion = $_GET["posicion"];
try {
     if($posicion=="1"){
       $stmt 	= $pdo->query("update dlp_mapa_visitas set urlFoto='no' where idVisita like '$idVisita'");
       $data[] = "ok";
     }
     if($posicion=="2"){
      $stmt 	= $pdo->query("update dlp_mapa_visitas set urlFoto2='no' where idVisita like '$idVisita'");
      $data[] = "ok";
    }
    if($posicion=="3"){
      $stmt 	= $pdo->query("update dlp_mapa_visitas set urlFoto3='no' where idVisita like '$idVisita'");
      $data[] = "ok";
    }
      
     
   // retorno datos en JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
echo json_encode($data);

?>