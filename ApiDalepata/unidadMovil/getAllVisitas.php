<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
try {
   $stmt 	= $pdo->query("SELECT * FROM dlp_mapa_visitas where fechaInicial BETWEEN '2021-01-01' and '2021-12-31' and fechaFinal BETWEEN '2021-01-01' and '2021-12-31'  order by idMunicipio ASC");
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