<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $key     =  strip_tags($obj->key);
    $nombre	  = filter_var($obj->nombre, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $des	  = filter_var($obj->descripcion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");         
   
    try {
        $stmt 	= $pdo->query("insert into dlp_noticas_fauna(nombre,descripcion,urlImagen,estado,fechaRegistro) 
        VALUES ('$nombre','$des','','Activo','$hoy')");
        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        {
            $data[] = "ok";
        }
        // retorno datos en JSON
     }
     catch(PDOException $e)
     {
        echo $e->getMessage();
     }
     echo json_encode($data);
?>

