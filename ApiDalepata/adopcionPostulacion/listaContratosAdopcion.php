<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    
    $identidad	  = $_GET["identidad"];
 
    try {
        $stmt 	= $pdo->query("SELECT * FROM dlp_adopcion_postulaciones WHERE identidad like '$identidad' order by fechaContratoUpload DESC");
       while($row  = $stmt->fetch(PDO::FETCH_OBJ))
       {
           $data[] = $row;
       }
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

