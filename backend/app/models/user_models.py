
from sqlalchemy import Column, Integer, String, Enum as SQLEnum
import enum
from app.core.database import Base 

class RoleEnum(str, enum.Enum):
    Gestor = "Gestor"
    Vendedor = "Vendedor"

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    senha_hash = Column(String(255), nullable=False)
    role = Column(SQLEnum(RoleEnum), nullable=False)