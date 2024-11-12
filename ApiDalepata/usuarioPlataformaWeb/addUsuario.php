<?php
    include("../conexion.php");
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $idFundacion   = filter_var($obj->idFundacion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $tipoDoc    = filter_var($obj->tipoDoc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombres    = filter_var($obj->nombres, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $apellidos  = filter_var($obj->apellidos, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $identidad  = filter_var($obj->identidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $direccion  = filter_var($obj->direccion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $telefono  = filter_var($obj->telefono, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $movil  = filter_var($obj->movil, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $email  = filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $clave  = filter_var($obj->clave, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nomUsuario = $email;
   

   //verifico q no exista la misma identidad y correo
   $cantidad=0;
   $stmt 	= $pdo->query("SELECT * FROM dlp_usuario where identidad like '$identidad' or email like '$email'");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
      $cantidad=1;
   }

   if($cantidad==0){
            $canUsuarios=0;
            if($idFundacion=="no"){
               $canUsuarios=0;
            }else{
                  $usuarios 	= $pdo->query("SELECT * FROM dlp_usuario where idFundacion like '$idFundacion' and ");
                  while($usu  = $usuarios->fetch(PDO::FETCH_OBJ)){
                     $canUsuarios=1;
                  }
            }
            if($canUsuarios<=0){
                  $clave = password_hash($clave, PASSWORD_DEFAULT, ['cost'=>10]);
                  date_default_timezone_set('America/Bogota');
                  $hoy = date("Y-m-d g:i a");         
                  try {
                     $stmt 	= $pdo->query("insert into dlp_usuario(nomUsuario,idFundacion,tipoDoc,identidad,idCiudad,
                     nombres,apellidos,fotoPerfil,direccion,rolUsuario,telefono,movil,clave,email,facebook,twitter,
                     fechaRegistro,usuarioRegistra,estado)VALUES ('$nomUsuario','$idFundacion','$tipoDoc','$identidad',
                     'no','$nombres','$apellidos','no','$direccion','no','$telefono','$movil','$clave','$email',
                     'no','no','$hoy','no','Activo')");
                     $data["resul"]= $stmt->rowCount();
                  }
                  catch(PDOException $e)
                  {
                     echo $e->getMessage();
                  }
            }
            if($canUsuarios>0){
               $data["resul"]= -1;  //-1 significa q hay ya un usuariopara la fundacion
            }

   }

   if($cantidad>0){
      $data["resul"]= 0;
   }


     echo json_encode($data);
?>


