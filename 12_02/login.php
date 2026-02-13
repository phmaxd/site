<?php
include "conecta.php";

$usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
$senha = isset($_POST['senha']) ?  trim($_POST['senha']) : '';

if ($usuario == '' || $senha == '') {
    echo json_encode(['success' => false, 'message' => 'Usuário e senha são obrigatórios']);
    exit;
}

$select = $conn->prepare("SELECT * FROM usuario WHERE usuario = :usuario LIMIT 1");
$select->execute(['usuario' => $usuario]);

if ($select->rowCount() > 0) {
    $row = $select->fetch(PDO::FETCH_ASSOC);
    
    if ($row['senha'] === $senha && $row['usuario'] === $usuario) {
        echo json_encode(['success' => true, 'message' => 'Login realizado com sucesso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Senha incorreta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuário não encontrado']);
}