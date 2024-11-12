<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);

   $identidad = $_GET['identidad'];
   try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_adopcion_postulaciones where identidad like '$identidad' and  estadoPostulado like 'Aceptado'");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         $idMascotaE = $row->idMascota;
         $stmt2 	= $pdo->query("SELECT * FROM dlp_mascota where idMascota like '$idMascotaE'");
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