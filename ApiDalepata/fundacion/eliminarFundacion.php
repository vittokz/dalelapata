<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);

    $idFundacion	  = $_GET['idFundacion'];
    
    
            //recojo datos de mascota
            $stmt = $pdo->query("update dlp_fundacion set estado ='Eliminado' where idFundacion like '$idFundacion'");
            $data["resul"] = "ok";
        echo json_encode($data);
       
?>



