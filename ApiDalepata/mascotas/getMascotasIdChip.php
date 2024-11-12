<?php
  include("../conexion.php");
  $pdo = conectarse();
  $data    = array();

   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);

   //$numChip  = filter_var($obj->numChip, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   $numChip = $_GET['numChip'];
   $ban=0;
   try {
      $stmt 	= $pdo->query("SELECT * FROM dlp_mascota where numChip like '$numChip'");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $data[] = $row;
         $ban=1;
      }
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
   if($ban==1){
      echo json_encode($data);
   }
   else{
      $data["resul"] = "0";
      echo json_encode($data);
   }
  
?>