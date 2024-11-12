<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
$idUsuario = $_GET['idUsuario'];
$ban=0;
try {
   $stmt 	= $pdo->query("SELECT * FROM dlp_adopcion_postulaciones where idUsuario like '$idUsuario' and idTipoRelacion like '1' and estadoPostulado like 'Aceptado'  order by idUsuario DESC");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
       $idMascota = $row->idMascota;
       $sqlMascota = $pdo->query("SELECT * FROM dlp_mascota where idMascota like '$idMascota'");
       while($rowMascota  = $sqlMascota->fetch(PDO::FETCH_OBJ))
       {
         $data[] = $rowMascota;
         $ban=1;
       }
   }
   // retorno datos en JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
if($ban==1){
  echo json_encode($data);  
}else{
  $data["resul"] = "-1";  
  echo json_encode($data);  
}


?>