<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
try {
   $stmt 	= $pdo->query("SELECT DISTINCT(idMunicipio) FROM dlp_mapa_visitas where idMunicipio <> '4' order by idMunicipio ASC");
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