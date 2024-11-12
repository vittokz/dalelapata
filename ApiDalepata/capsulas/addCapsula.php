<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $des	  = $_POST["descripcion"];
    $link	  = $_POST["link"];
    $identidadRegistra	  = $_POST["identidadRegistra"];

        
   
    try {
        $stmt 	= $pdo->query("insert into dlp_capsulas(descripcion,url,estado,usuarioRegistro) 
        VALUES ('$des','$link','Activo','$identidadRegistra')");
        $data[] = "ok";
       
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

