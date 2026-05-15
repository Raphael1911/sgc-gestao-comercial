-- Script SQL para criar o banco de dados e tabelas do projeto SGC
-- Execute estes comandos no MySQL Workbench para configurar o banco local

-- 1. Criar o banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS sgc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Usar o banco criado
USE sgc;

-- 3. Criar tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    preco DECIMAL(10,2),
    custo DECIMAL(10,2),
    estoque INT DEFAULT 0,
    INDEX idx_produtos_codigo (codigo),
    INDEX idx_produtos_nome (nome)
);

-- Nota: DECIMAL(10,2) é melhor para preços (evita problemas de precisão com FLOAT)


-- 4. Criar tabela de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    role ENUM('Gestor', 'Vendedor') NOT NULL
);