from pydantic import BaseModel

# O que o frontend precisa enviar para criar um produto
class ProdutoCreate(BaseModel):
    codigo: str
    nome: str
    categoria: str
    preco: float
    custo: float
    estoque: int

# O que o backend devolve para o frontend
class ProdutoResponse(ProdutoCreate):
    id: int

    class Config:
        from_attributes = True