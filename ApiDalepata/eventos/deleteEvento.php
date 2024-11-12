<?php
    include("../conexion.php");
    $pdo = conectarse();

    $data    = array();
    // Retrieve the posted data
    $json    =  file_get_contents('php://input');
    $obj     =  json_decode($json);
    $idEvento  = $_GET['idEvento'];
    try {
        $stmt 	= $pdo->query("delete from dlp_eventos_sads where idEvento like '$idEvento'");
        $data[] = "ok";
    }
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }
    // retorno datos en JSON
    echo json_encode($data);
?>

