<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);

   $identidad  = $_GET['identidad'];
   $ban=0;
   try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_usuario where identidad like '$identidad'");   
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
               // Assign each row of data to associative array
               $ban=1;
               $data[] = $row;
            }
      if($ban==0){
         $data["resul"] = 0;
      }
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
   echo json_encode($data);
?>