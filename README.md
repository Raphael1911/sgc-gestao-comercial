# 🛒 SGC - Sistema de Gestão Comercial

![Status](https://img.shields.io/badge/Status-Concluído-success)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)

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

### 🟢 Backend & Banco de Dados
* **Linguagem:** Python 3.10+
* **Framework API:** FastAPI (Assíncrono, documentação interativa via Swagger)
* **Banco de Dados:** MySQL (Relacional)
* **ORM:** SQLAlchemy
* **Validação de Dados:** Pydantic
* **Servidor ASGI:** Uvicorn

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/), o [Python 3.10+](https://www.python.org/) e o [MySQL](https://www.mysql.com/) instalados em sua máquina.

1. Clone este repositório:
```bash
git clone [https://github.com/seu-usuario/sgc-gestao-comercial.git](https://github.com/seu-usuario/sgc-gestao-comercial.git)
cd sgc-gestao-comercial
```

---

### 🎨 Executando o Frontend

1. Acesse a pasta do frontend:
```bash
cd frontend
```
2. Instale as dependências:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O sistema estará disponível em `http://localhost:5173`.

---

### ⚙️ Executando o Backend

1. Volte para a raiz e acesse a pasta do backend:
```bash
cd ../backend
```

2. Crie e ative o ambiente virtual:
   - **No Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **No Linux / Mac:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Instale as dependências do Python:
```bash
pip install -r requirements.txt
```

4. Configure o Banco de Dados:
Crie um arquivo `.env` dentro da pasta `backend` com as suas credenciais locais do MySQL:
```env
DATABASE_URL=mysql+pymysql://root:suasenha@localhost:3306/sgc_db
```
*(Lembre-se de criar o banco `sgc_db` no seu MySQL antes de rodar o servidor).*

5. Inicie a API:
```bash
uvicorn main:app --reload
```
A documentação automática interativa estará disponível em `http://127.0.0.1:8000/docs`.

---

## 👨‍💻 Equipe de Desenvolvimento

* **Raphael Trindade Olho**
* **Pedro Graciani de Souza**
* **Eduardo Jimenes Junior**
* **Miguel Hitoshi**
* **Daniel Almeida**

---
*Projeto desenvolvido com dedicação e foco em usabilidade. FATEC Zona Leste, 2026.*
