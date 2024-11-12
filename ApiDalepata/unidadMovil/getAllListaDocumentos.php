<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
try {
   $stmt 	= $pdo->query("SELECT id,nombre FROM dlp_ciudades");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
        $relacion = $row->id;
        $stmt2 	= $pdo->query("SELECT DISTINCT(idMunicipio),tipoArchivo,nombreArchivo,fechaRegistro,estado FROM dlp_solicitudes_visitas where idMunicipio like '$relacion' order by fechaRegistro DESC");
         while($row2  = $stmt2->fetch(PDO::FETCH_OBJ))
         {
              $data[] = $row2;
         }
   }
  /*  $stmt 	= $pdo->query("SELECT dlp_ciudades.nombre, dlp_solicitudes_visitas.idSolicitud, DISTINCT (dlp_solicitudes_visitas.idMunicipio)
   FROM dlp_solicitudes_visitas,dlp_ciudades 
   where dlp_ciudades.id like dlp_solicitudes_visitas.idMunicipio 
   order by fechaRegistro DESC"); */
  
   // retorno datos en JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
echo json_encode($data);

?>