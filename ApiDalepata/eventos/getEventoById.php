<?php
   include("../conexion.php");
   $pdo = conectarse();
   $data    = array();
   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $idEvento = $_GET["idEvento"];
    try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_eventos_sads where idEvento like '$idEvento'");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
          $data[] = $row;
      }
      // retorno datos en JSON
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
   echo json_encode($data);
?>