<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);

   $identidad  = $_GET['identidad'];

   try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_usuarios_sistema where identidad like '$identidad'");
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