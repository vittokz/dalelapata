<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$idMascota = $_GET['idMascota'];
try {
   $stmt 	= $pdo->query("SELECT * FROM dlp_adopcion_postulaciones where idMascota like '$idMascota' and idTipoRelacion like '2'  order by idMascota DESC");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
       $identidad = $row->identidad;
       $sqlUsuario = $pdo->query("SELECT * FROM dlp_usuario where identidad like '$identidad'");
       while($rowUsuario  = $sqlUsuario->fetch(PDO::FETCH_OBJ))
       {
         $data[] = $rowUsuario;
       }
   }
   // retorno datos en JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
echo json_encode($data);

?>