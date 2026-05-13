# 🛒 SGC - Sistema de Gestão Comercial

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-warning)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)

O **SGC (Sistema de Gestão Comercial)** é uma aplicação web moderna, responsiva e acessível desenvolvida para facilitar o controle de vendas, estoque e análises financeiras de pequenos e médios empreendimentos.

Este projeto foi desenvolvido como requisito acadêmico para o curso de Desenvolvimento de Software Multiplataforma (DSM) da FATEC Zona Leste.

## ✨ Funcionalidades

O sistema conta com perfis de acesso distintos (Gestor e Vendedor) e oferece as seguintes ferramentas:

* **📊 Dashboard Interativo:** Visão geral do negócio com gráficos de faturamento, comparativos de metas diárias e análise de Curva ABC.
* **📦 Gestão de Estoque:** Controle completo de produtos (CRUD), com alertas automáticos de estoque baixo e cálculo de margem de lucro.
* **💳 Frente de Caixa (PDV):** Interface otimizada para vendas rápidas, com leitor de código de barras, controle de carrinho e múltiplas formas de pagamento (PIX, Cartão e Dinheiro com cálculo de troco).
* **📈 Relatórios Financeiros:** Análise detalhada de receitas, despesas, lucros mensais e ranking de categorias mais vendidas.
* **⚙️ Configurações:** Gerenciamento de perfil, preferências de notificação do sistema e controle de usuários.
* **🌓 Dark Mode Nativo:** Suporte completo e dinâmico aos temas Claro e Escuro, garantindo conforto visual e acessibilidade.

## 🛠️ Tecnologias Utilizadas

A aplicação utiliza a arquitetura de **Monorepo**, dividindo as responsabilidades entre:

### 🔵 Frontend
* **Framework:** React (com Vite) + TypeScript
* **Estilização:** Tailwind CSS + `next-themes` (Dark Mode Global)
* **Componentes de UI:** Radix UI / shadcn/ui
* **Gráficos:** Recharts
* **Ícones:** Lucide React

### 🟢 Backend & Infraestrutura
* **Linguagem:** Python 3.10+
* **Framework API:** FastAPI (Assíncrono, documentação interativa via Swagger)
* **Banco de Dados:** MySQL 8.0 (Relacional)
* **ORM & Validação:** SQLAlchemy + Pydantic
* **Segurança (AppSec):** SlowAPI (Rate Limiting contra Força Bruta) e CORS Estrito
* **Infraestrutura (IaC):** Docker & Docker Compose (Ambiente isolado e padronizado)

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalados em sua máquina.

1. Clone este repositório:
    ```bash
    git clone [https://github.com/seu-usuario/sgc-gestao-comercial.git](https://github.com/seu-usuario/sgc-gestao-comercial.git)
    cd sgc-gestao-comercial
    ```

---

### ⚙️ Executando o Backend (Recomendado via Docker)

Nós utilizamos o Docker para garantir que o banco de dados e a API rodem perfeitamente em qualquer sistema operacional, sem necessidade de instalar o MySQL manualmente.

1. Acesse a pasta do backend:
    ```bash
    cd backend
    ```

2. Configure as Variáveis de Ambiente:
    Faça uma cópia do arquivo `.env.example` e renomeie para `.env`.
    ```bash
    cp .env.example .env
    ```

3. Suba a infraestrutura completa com um único comando:
    ```bash
    docker compose up -d --build
    ```

A API estará rodando blindada e a documentação interativa ficará disponível em `http://localhost:8000/docs`.

> **Nota para execução manual (Sem Docker):** Caso queira rodar o servidor localmente no seu SO, ative sua `venv`, instale o `requirements.txt`, configure o `.env` apontando para o seu MySQL local (`localhost`) e rode: `uvicorn app.main:app --reload`.

---

### 🎨 Executando o Frontend

1. Abra um novo terminal e acesse a pasta do frontend:
    ```bash
    cd frontend
    ```
2. Configure as Variáveis de Ambiente:
    Crie um arquivo `.env` baseado no `.env.example` apontando para `http://localhost:8000`.

3. Instale as dependências e inicie o servidor:
    ```bash
    npm install
    npm run dev
    ```
O sistema estará disponível em `http://localhost:5173`.

---

## 👨‍💻 Equipe de Desenvolvimento

* **Raphael Trindade Olho**
* **Pedro Graciani de Souza**
* **Eduardo Jimenes Junior**
* **Miguel Hitoshi**
* **Daniel Almeida**

---
*Projeto desenvolvido com dedicação e foco em usabilidade. FATEC Zona Leste, 2026.*
