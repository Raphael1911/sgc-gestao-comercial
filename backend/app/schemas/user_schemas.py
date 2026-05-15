from pydantic import BaseModel, EmailStr
from enum import Enum

class RoleEnum(str, Enum):
    Gestor = "Gestor"
    Vendedor = "Vendedor"

# Para criar um usuário novo (senha em texto limpo)
class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    role: RoleEnum

# Para devolver dados (SEM A SENHA!)
class UsuarioResponse(BaseModel):
    id: int
    nome: str
    email: EmailStr
    role: RoleEnum

    class Config:
        from_attributes = True

# O que chega no endpoint de login
class LoginData(BaseModel):
    email: EmailStr
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str