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

Certifique-se de ter o [Node.js](https://nodejs.org/) e o [Python 3.10+](https://www.python.org/) instalados em sua máquina. Para ambiente isolado, Docker é recomendado.

1. Clone este repositório:
    ```bash
    git clone [https://github.com/seu-usuario/sgc-gestao-comercial.git](https://github.com/seu-usuario/sgc-gestao-comercial.git)
    cd sgc-gestao-comercial
    ```

---

### ⚙️ Executando o Backend

#### Via Docker (Recomendado)
Nós utilizamos o Docker para garantir que o banco de dados e a API rodem perfeitamente em qualquer sistema operacional.

1. Acesse a pasta do backend:
    ```bash
    cd backend
    ```

2. Configure as Variáveis de Ambiente:
    ```bash
    cp .env.example .env
    ```
    Edite o `.env` com suas credenciais (para Docker, use `db` como host; para local, use `localhost`).

3. Suba a infraestrutura:
    ```bash
    docker compose up -d --build
    ```
    
A API estará disponível em `http://localhost:8000` e a documentação interativa em `http://localhost:8000/docs`.

#### Execução Local (Sem Docker)
Se preferir rodar localmente em seu SO:

1. Crie o banco de dados MySQL local com o script:
    ```bash
    # Execute o arquivo database_setup.sql no MySQL Workbench
    # Ou via linha de comando:
    mysql -u root -p < backend/database_setup.sql
    ```

2. Configure o ambiente Python:
    ```bash
    cd backend
    python -m venv venv
    
    # Windows
    .\venv\Scripts\Activate.ps1
    # ou Mac/Linux
    source venv/bin/activate
    
    pip install -r requirements.txt
    ```

3. Configure o `.env`:
    ```bash
    cp .env.example .env
    # Edite .env com seu usuário e senha MySQL local
    # DATABASE_URL=mysql+pymysql://root:suasenha@localhost:3306/sgc
    ```

4. Inicie o servidor:
    ```bash
    uvicorn app.main:app --reload --port 8000
    ```

#### Testando a Conexão
Após o backend subir, acesse:
- `http://127.0.0.1:8000/` — health check
- `http://127.0.0.1:8000/productos` — valida conexão com MySQL

---

### 🎨 Executando o Frontend

1. Abra um novo terminal e acesse a pasta do frontend:
    ```bash
    cd frontend
    ```

2. Configure as Variáveis de Ambiente:
    ```bash
    cp .env.example .env
    # Aponte para http://localhost:8000
    ```

3. Instale as dependências e inicie o servidor:
    ```bash
    npm install
    npm run dev
    ```
    
O sistema estará disponível em `http://localhost:5173`.

---

## 📊 Estado Atual do Backend

### Banco de Dados
- ✅ MySQL local integrado e testado
- ✅ Tabela `produtos` pronta
- ✅ Script `database_setup.sql` para inicializar o banco
- ✅ Arquivo `.env.example` e `.env` configurados

### API & Rotas
- ✅ `/` — health check (retorna status ok)
- ✅ `/produtos` — lista produtos (conecta ao MySQL)
- ✅ Documentação automática em `/docs` (Swagger)

### Configurações
- ✅ SQLAlchemy + Pydantic para modelos e validação
- ✅ CORS configurado para o frontend em `localhost:5173`
- ✅ Rate limiting (SlowAPI) contra força bruta
- ✅ Criação automática de tabelas ao iniciar a aplicação

---

## 👨‍💻 Equipe de Desenvolvimento

* **Raphael Trindade Olho**
* **Pedro Graciani de Souza**
* **Eduardo Jimenes Junior**
* **Miguel Hitoshi**
* **Daniel Almeida**

---
*Projeto desenvolvido com dedicação e foco em usabilidade. FATEC Zona Leste, 2026.*
