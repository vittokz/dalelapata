<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);

   //$numChip  = filter_var($obj->numChip, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   $idRaza = $_GET['idRaza'];
   try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_raza where id like '$idRaza'");
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