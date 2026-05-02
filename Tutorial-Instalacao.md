### 📦 Parte 1: Instalação das Dependências (Node.js & React)

Se você (ou alguém da sua equipe) baixar o projeto do zero, a primeira coisa a fazer é instalar os "motores" do sistema.

**1. Instalação base do Frontend (React/Vite)**
No terminal, dentro da pasta raiz do projeto, instale as dependências padrões que o Vite e o seu layout exigem:
```bash
npm install
npm install lucide-react
```
*(O `npm install` sozinho lê o seu `package.json` e baixa o coração do React, enquanto o segundo garante que os ícones da sua interface funcionem).*

**2. Instalação do Backend (Node.js + Mongoose)**
Ainda no mesmo terminal, instale as bibliotecas que fazem a API e o Banco de Dados conversarem:
```bash
npm install express mongoose cors dotenv
```

**3. Instalação do Gerenciador de Terminais**
Para rodar o front e o back ao mesmo tempo com um comando só:
```bash
npm install concurrently --save-dev
```

**4. Configuração das Variáveis de Ambiente**
Crie um arquivo chamado `.env` na raiz do projeto (se ele não existir) e coloque a rota do seu banco local:
```env
MONGO_URI=mongodb://localhost:27017/meu_sistema
PORT=3000
```

**🚀 Como rodar o sistema?:**
Com tudo instalado, basta usar o nosso super comando configurado:
```bash
npm run start
```

**Como parar o sistema?:**
Basta utilizar o comando: Ctrl + C e após isso o terminal vai ficar meio estranho, mas basta dar um Enter que ele fica normal.

---

### 🧭 Parte 2: Acessando o MongoDB Compass

O MongoDB Compass é a sua janela visual para o banco de dados. Como o sistema está rodando localmente, o acesso é direto e não exige senhas.

**Passo 1: Baixar e Instalar**
*   Se ainda não tiver na máquina, acesse o site oficial do [MongoDB Compass](https://www.mongodb.com/products/tools/compass) e faça o download gratuito.
*   *Lembrete:* Para rodar local, você também precisa ter o "motor" instalado, que é o **MongoDB Community Server**.

**Passo 2: Conectando ao Banco Local**
1. Abra o aplicativo **MongoDB Compass**.
2. Logo na tela inicial, você verá uma barra de endereço grande escrita "URI".
3. Cole a string de conexão local padrão:
   `mongodb://localhost:27017/`
4. Clique no botão verde **Connect**.

**Passo 3: Navegando nos seus Dados**
*   **Databases:** Na barra lateral esquerda, você verá todos os bancos criados. Procure pelo nome que você definiu no `.env` (ex: `meu_sistema`).
*   **Collections:** Clicando no banco, você verá suas coleções (como a `items` que criamos para o estoque).
*   **Gerenciamento:** 
    *   Para **adicionar** algo manualmente, clique no botão verde *Add Data* > *Insert Document*.
    *   Para **editar**, passe o mouse sobre um item e clique no ícone de lápis.
    *   Para **excluir**, clique no ícone de lixeira vermelha.
    *   Use o botão de **Refresh** (seta circular no canto superior direito) sempre que quiser ver se uma alteração feita pelo seu React já chegou no banco.