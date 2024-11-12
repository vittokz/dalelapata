<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $idUsuario	  = filter_var($obj->idUsuario, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idFundacion	  = filter_var($obj->idFundacion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $chip	  = filter_var($obj->chip, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombre	  = filter_var($obj->nombre, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $edad	  = filter_var($obj->edad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idRaza	  = filter_var($obj->idRaza, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idEspecie	  = filter_var($obj->idEspecie, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idGenero = filter_var($obj->idGenero, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $tamano	  = filter_var($obj->tamano, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $peso	  = filter_var($obj->peso, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $ciudad	  = filter_var($obj->ciudad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $estadoMascota	  = filter_var($obj->estadoMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $color	  = filter_var($obj->color, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $foto	  = filter_var($obj->foto, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $descripcion	  = filter_var($obj->descripcion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    
     //RECUPERO EL NOMBRE DEL MUNICIPIO
    
     $stmt 	= $pdo->query("SELECT nombre FROM dlp_ciudades where id like '$ciudad'");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
        $nombreCiudad = $row->nombre;
      }
    //RECUERAR NOMPRE MUNICIPIO
    
   date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");
    $ban=0;
    $stmt 	= $pdo->query("select * from dlp_mascota where numChip like '$chip'");
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         $ban=1;
      }
   
   if($ban==0){ 
         try {
            $stmt 	= $pdo->query("INSERT INTO dlp_mascota (numChip, idUsuario, idFundacion,nombre, edad, descripcion, idRaza, idEspecie, idGenero, tamano, estadoMascota,urlFoto,peso, ciudad,nomCiudad, color, idCondiCorporal, fechaRegistro, usuarioRegistro, estado)
            VALUES ('$chip','$idUsuario','$idFundacion','$nombre','$edad','$descripcion','$idRaza','$idEspecie','$idGenero','$tamano','$estadoMascota','$foto','$peso','$ciudad','$nombreCiudad','$color','','$hoy','$idUsuario','Activo')");
            //$stmt->execute();
            $data["resul"]= $stmt->rowCount();
         }
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }
      }
      else{
         $data["resul"]= 0;
      }
      echo json_encode($data);
?>

