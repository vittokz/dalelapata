<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    
    $idFundacion	  = $_GET["idFundacion"];
 
    try {
        $stmt 	= $pdo->query("SELECT p.idRelacion,p.fechaAceptado, u.* FROM dlp_adopcion_postulaciones p, dlp_usuario u
         WHERE p.idFundacion like '$idFundacion' and p.estadoContrato like 'subido' and p.identidad like u.identidad 
        order by p.fechaContratoUpload DESC");
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

