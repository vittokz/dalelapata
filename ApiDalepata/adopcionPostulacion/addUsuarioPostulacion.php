<?php
    include("../conexion.php");
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '../phpMailer/Exception.php';
    require '../phpMailer/PHPMailer.php';
    require '../phpMailer/SMTP.php';
    $pdo = conectarse();
    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);

    $idMascota	  = filter_var($obj->idMascota, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $idFundacion   = filter_var($obj->idFundacion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $tipoDoc    = filter_var($obj->tipoDoc, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombres    = filter_var($obj->nombres, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $apellidos  = filter_var($obj->apellidos, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $identidad  = filter_var($obj->identidad, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $direccion  = filter_var($obj->direccion, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $telefono  = filter_var($obj->telefono, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $movil  = filter_var($obj->movil, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $emailUsuario  = filter_var($obj->email, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $clave  = filter_var($obj->clave, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $nombreUsuario = $nombres." ".$apellidos;
    $nomUsuario = $emailUsuario;
    date_default_timezone_set('America/Bogota');
    $hoy = date("Y-m-d g:i a");      

    /*
    0= el correo ya existe
    1= se registro usuario correctamente
    -1: ya se encuentra postulado

    */

    //verifico q no exista la misma identidad y correo
   $cantidad=0;
   $stmt 	= $pdo->query("SELECT * FROM dlp_usuario where identidad like '$identidad' or email like '$email'");
   while($row  = $stmt->fetch(PDO::FETCH_OBJ))
   {
      $cantidad=1;
   }
   if($cantidad==0){
                  $canUsuarios=0;  
                  $clave = password_hash($clave, PASSWORD_DEFAULT, ['cost'=>10]);
                  date_default_timezone_set('America/Bogota');
                  $hoy = date("Y-m-d g:i a");         
                  try {
                     $stmt 	= $pdo->query("insert into dlp_usuario(nomUsuario,idFundacion,tipoDoc,identidad,idCiudad,
                     nombres,apellidos,fotoPerfil,direccion,rolUsuario,telefono,movil,clave,email,facebook,twitter,
                     fechaRegistro,usuarioRegistra,estado)VALUES ('$nomUsuario','$idFundacion','$tipoDoc','$identidad',
                     'no','$nombres','$apellidos','no','$direccion','no','$telefono','$movil','$clave','$emailUsuario',
                     'no','no','$hoy','no','Activo')");
                     
                     
                     //registro la postulacion
                        $ban=0;
                        $stmt2 = $pdo->query("select * from dlp_adopcion_postulaciones where identidad like '$identidad' and idMascota like '$idMascota'");
                        while($row2  = $stmt2->fetch(PDO::FETCH_OBJ))
                        {
                            $ban=1;
                        }
                        if($ban==0){
                                //recojo datos de mascota
                                $stmt = $pdo->query("select * from dlp_mascota where idMascota like '$idMascota'");
                                while($row  = $stmt->fetch(PDO::FETCH_OBJ))
                                {
                                    $nombreMascota= $row->nombre;
                                    $idFundacion= $row->idFundacion;
                                }
                                //fin datos mascota     
                                //recojo el correo del fundacion
                                $stmt = $pdo->query("select * from dlp_fundacion where idFundacion like '$idFundacion'");
                                while($row  = $stmt->fetch(PDO::FETCH_OBJ))
                                {
                                    $nombreFundacion = $row->razonSocial;
                                    $emailFundacion = $row->email;
                                    $movil = $row->movil;
                                }
                                //fin correo fundacion
                                
                                try {
                                    $stmtP 	= $pdo->query("insert into dlp_adopcion_postulaciones(identidad,idMascota,idFundacion,idTipoRelacion,estadoPostulado,fechaRegistro) 
                                    VALUES ('$identidad','$idMascota','$idFundacion','2','Postulado','$hoy')");
                                    $data["resul"] = "1";
                               
                                    
                                }
                                catch(PDOException $e)
                                {
                                    echo $e->getMessage();
                                }
                        
                        }
                        else{
                            $data["resul"] = "-1"; //POSTULACION YA EXISTE
                            echo json_encode($data);
                        }     
                  }
                  catch(PDOException $e)
                  {
                     echo $e->getMessage();
                  }
   }

   if($cantidad>0){
      $data["resul"]= "0"; //EL CORREO YA EXISTE
   }
?>

