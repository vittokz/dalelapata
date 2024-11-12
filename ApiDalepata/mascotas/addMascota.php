<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    
    $microChip	  = $_POST["microChip"];
    $idUsuario	  = $_POST["idUsuario"];
    $idFundacion	  = $_POST["idFundacion"];
    $nombre	  = $_POST["nombre"];
    $edad	  = $_POST["edad"];
    $idRaza	  = $_POST["raza"];
    $idEspecie	  = $_POST["especie"];
    $idGenero = $_POST["genero"];
    $tamano	  = $_POST["tamano"];
    $peso	  = $_POST["peso"];
    $ciudad	  = $_POST["ciudad"];
    $estadoMascota	  = $_POST["estadoMascota"];
    $color	  = $_POST["color"];
    $descripcion	  = $_POST["descripcion"];
    
   
    $cantMicroChip = strlen($microChip);
    
    if($estadoMascota=='6' || $estadoMascota=='1' || $estadoMascota=='2' || $estadoMascota=='3' || $estadoMascota=='4' || $estadoMascota=='5' ){
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
        $stmt 	= $pdo->query("select * from dlp_mascota where numChip like '$microChip' and numChip <> ''");
        while($row  = $stmt->fetch(PDO::FETCH_OBJ))
        {
            $ban=1;
        }

        if($ban==0){ 
        
            $stmt 	= $pdo->query("select max(idMascota) as mayor from dlp_mascota");
            while($row  = $stmt->fetch(PDO::FETCH_OBJ))
            {
               $idMascota=$row->mayor;
            }
      
            $upload_dir = 'img';
            $server_url = 'img';
            if (!file_exists($server_url)) {
               mkdir($server_url, 0777, true);
            }
           
            $idMascota = $idMascota + 1;
      
           if($_FILES['avatar'])
           {
               $avatar_name = $_FILES["avatar"]["name"];
               $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
               $error = $_FILES["avatar"]["error"];
      
               if($error > 0){
                   $response = array(
                       "status" => "error",
                       "error" => true,
                       "message" => "Error uploading the file!"
                   );
               }else 
               {
                   $upload_name = $idMascota.$avatar_name;
               
                   if(move_uploaded_file($avatar_tmp_name , "img/".$upload_name)) {
                       $response = array(
                           "status" => "success",
                           "error" => false,
                           "message" => "File uploaded successfully",
                           "url" => $server_url."/".$upload_name
                       );
                   }else
                   {
                       $response = array(
                           "status" => "error",
                           "error" => true,
                           "message" => "Error uploading the file!"
                       );
                   }
               }    
           }else{
               $response = array(
                   "status" => "error",
                   "error" => true,
                   "message" => "No file was sent!"
               );
           }
      
      
      
               try {
                  $stmt 	= $pdo->query("INSERT INTO dlp_mascota (numChip, idUsuario, idFundacion,nombre, edad, descripcion, idRaza, idEspecie, idGenero, tamano, estadoMascota,urlFoto,peso, ciudad, nomCiudad, color, idCondiCorporal, fechaRegistro, usuarioRegistro, estado)
                  VALUES ('$microChip','$idUsuario','$idFundacion','$nombre','$edad','$descripcion','$idRaza','$idEspecie','$idGenero','$tamano','$estadoMascota','$upload_name','$peso','$ciudad','$nombreCiudad','$color','','$hoy','$idUsuario','Activo')");
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

    }
    else{

        if($cantMicroChip==15){
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
            $stmt 	= $pdo->query("select * from dlp_mascota where numChip like '$microChip' and numChip <> ''");
              while($row  = $stmt->fetch(PDO::FETCH_OBJ))
              {
                 $ban=1;
              }
           
           if($ban==0){ 
        
              $stmt 	= $pdo->query("select max(idMascota) as mayor from dlp_mascota");
              while($row  = $stmt->fetch(PDO::FETCH_OBJ))
              {
                 $idMascota=$row->mayor;
              }
        
              $upload_dir = 'img';
              $server_url = 'img';
              if (!file_exists($server_url)) {
                 mkdir($server_url, 0777, true);
              }
             
              $idMascota = $idMascota + 1;
        
             if($_FILES['avatar'])
             {
                 $avatar_name = $_FILES["avatar"]["name"];
                 $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
                 $error = $_FILES["avatar"]["error"];
        
                 if($error > 0){
                     $response = array(
                         "status" => "error",
                         "error" => true,
                         "message" => "Error uploading the file!"
                     );
                 }else 
                 {
                     $upload_name = $idMascota.$avatar_name;
                 
                     if(move_uploaded_file($avatar_tmp_name , "img/".$upload_name)) {
                         $response = array(
                             "status" => "success",
                             "error" => false,
                             "message" => "File uploaded successfully",
                             "url" => $server_url."/".$upload_name
                         );
                     }else
                     {
                         $response = array(
                             "status" => "error",
                             "error" => true,
                             "message" => "Error uploading the file!"
                         );
                     }
                 }    
             }else{
                 $response = array(
                     "status" => "error",
                     "error" => true,
                     "message" => "No file was sent!"
                 );
             }
        
        
        
                 try {
                    $stmt 	= $pdo->query("INSERT INTO dlp_mascota (numChip, idUsuario, idFundacion,nombre, edad, descripcion, idRaza, idEspecie, idGenero, tamano, estadoMascota,urlFoto,peso, ciudad, nomCiudad, color, idCondiCorporal, fechaRegistro, usuarioRegistro, estado)
                    VALUES ('$microChip','$idUsuario','$idFundacion','$nombre','$edad','$descripcion','$idRaza','$idEspecie','$idGenero','$tamano','$estadoMascota','$upload_name','$peso','$ciudad','$nombreCiudad','$color','','$hoy','$idUsuario','Activo')");
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
    }
    else{
         $data["resul"]= -1;
    }
      echo json_encode($data);

    }
 
    
?>

