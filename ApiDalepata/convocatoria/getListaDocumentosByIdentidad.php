<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$identidad = $_GET["identidad"];
try {
   $stmt 	= $pdo->query("SELECT dlp_convocatorias.*,dlp_ciudades.nombre FROM dlp_convocatorias,dlp_ciudades 
   where 
   usuarioRegistro like '$identidad' and
   dlp_ciudades.id like dlp_convocatorias.idMunicipio order by fechaRegistro DESC");
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