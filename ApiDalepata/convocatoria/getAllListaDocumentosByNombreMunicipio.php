<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();
// Retrieve the posted data
$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
try {

        $stmt2 	= $pdo->query("SELECT s.tipoArchivo,s.nombreArchivo,s.fechaRegistro,s.estado,c.nombre  FROM dlp_convocatorias s, dlp_ciudades c 
        where s.idMunicipio like c.id order by fechaRegistro DESC");
         while($row2  = $stmt2->fetch(PDO::FETCH_OBJ))
         {
              $data[] = $row2;
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