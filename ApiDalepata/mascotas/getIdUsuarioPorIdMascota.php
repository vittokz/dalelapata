<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);

   $idMascota = $_GET['idMascota'];
   try {
      $stmt 	= $pdo->query("SELECT idUsuario FROM dlp_adopcion_postulaciones where idMascota like '$idMascota'");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         $idUsuarioE = $row->idUsuario;
         $stmt2 	= $pdo->query("SELECT * FROM dlp_usuario where idUsuario like '$idUsuarioE'");
           while($row2  = $stmt2->fetch(PDO::FETCH_OBJ))
            {
            $data[] = $row2;
            }
      }
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
   echo json_encode($data);
?>