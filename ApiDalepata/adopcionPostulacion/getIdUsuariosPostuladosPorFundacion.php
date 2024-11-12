<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();

// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$idFundacion = $_GET['idFundacion'];
try {
   $stmt 	= $pdo->query("SELECT distinct(idUsuario) FROM dlp_adopcion_postulaciones where idFundacion like '$idFundacion' and idTipoRelacion like '1' and estadoPostulado like 'Aceptado'  order by idMascota DESC");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
       $idUsuario = $row->idUsuario;
       $sqlUsuario = $pdo->query("SELECT * FROM dlp_usuario where idUsuario like '$idUsuario'");
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