<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   $idFundacion  = $_GET["idFundacion"];
   try {
      $stmt 	= $pdo->query("SELECT identidad,nombres,apellidos,movil,email,direccion,fechaRegistro,estado FROM dlp_usuario where idFundacion like '$idFundacion'");
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