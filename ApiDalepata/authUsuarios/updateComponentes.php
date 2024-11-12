<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$estado	  = $_GET["estado"];
try {
   if($estado=="Activo"){
      $stmt 	= $pdo->query("UPDATE dlp_habilitar_componentes set estado ='Inactivo'");
   }
   if($estado=="Inactivo"){
      $stmt 	= $pdo->query("UPDATE dlp_habilitar_componentes set estado ='Activo'");
   }
  
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
       $data[] = $row;
   }
   // retorno datos en JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
echo json_encode($data);

?>