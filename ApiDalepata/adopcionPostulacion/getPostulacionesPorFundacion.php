<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();

// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$idFundacion = $_GET['idFundacion'];
try {
   $stmt 	= $pdo->query("SELECT distinct(idMascota) FROM dlp_adopcion_postulaciones where idFundacion like '$idFundacion' and idTipoRelacion like '2' and estadoPostulado <> 'Aceptado'  order by idMascota DESC");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
       $idMascota = $row->idMascota;
       $sqlMascota = $pdo->query("SELECT * FROM dlp_mascota where idMascota like '$idMascota'");
       while($rowMascota  = $sqlMascota->fetch(PDO::FETCH_OBJ))
       {
         $data[] = $rowMascota;
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