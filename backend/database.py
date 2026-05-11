import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

# Pega a URL do banco
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:senha@localhost:3306/sgc_db")

# Cria o motor de conexão com o MySQL
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Cria a fábrica de sessões (usada nas rotas para conversar com o banco)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para criar as tabelas
Base = declarative_base()

# Função auxiliar para injetar o banco nas rotas
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()