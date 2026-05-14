from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base

# Tabela de Produtos no MySQL
class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), unique=True, index=True)
    nome = Column(String(100), index=True)
    categoria = Column(String(50))
    preco = Column(Float)
    custo = Column(Float)
    estoque = Column(Integer, default=0)