<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);

   //$idFundacion  = filter_var($obj->numChip, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   $idUsuario = $_GET['idUsuario'];
   try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_mascota where idUsuario like '$idUsuario' order by fechaRegistro DESC");
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