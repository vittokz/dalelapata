<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$tipo = $_GET["tipo"];
$municipio = $_GET["municipio"];
try {
   $stmt 	= $pdo->query("SELECT * FROM dlp_mascota where estadoMascota like '4' and idEspecie like '$tipo' and nomCiudad like '$municipio' order by fechaRegistro ASC");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))   {
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