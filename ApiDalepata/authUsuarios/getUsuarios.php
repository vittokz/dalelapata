<?php
include("../conexion.php");
$pdo = conectarse();
$data    = array();

$json    =  file_get_contents('php://input');
$obj     =  json_decode($json);
try {
   $stmt 	= $pdo->query("SELECT * FROM dlp_usuarios_sistema order by identidad ASC");
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