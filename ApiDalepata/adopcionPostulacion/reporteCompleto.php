<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();

$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
try {

  $stmt 	= $pdo->query("SELECT usu.tipoDoc, usu.identidad,usu.nombres,usu.apellidos,usu.direccion,
   usu.movil,usu.email, usu.fechaRegistro, mas.numChip,mas.nombre,mas.edad,mas.descripcion,mas.idEspecie,
   mas.idGenero,mas.tamano,mas.peso,mas.nomCiudad,mas.color,mas.fechaRegistro
   FROM dlp_usuario usu, dlp_adopcion_postulaciones adop, dlp_mascota mas
   WHERE usu.idUsuario like adop.idUsuario and mas.idMascota like adop.idMascota");
  
  
  while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
      $data[] = $row;
   }
   // Return data as JSON
}
catch(PDOException $e)
{
   echo $e->getMessage();
}
echo json_encode($data);
?>