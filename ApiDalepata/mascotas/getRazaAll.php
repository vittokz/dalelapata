<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
  try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_raza order by nombre DESC");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
      }
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
   echo json_encode($data);
?>