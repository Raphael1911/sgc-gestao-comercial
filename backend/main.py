from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db

# Cria as tabelas no MySQL automaticamente se não existirem
# models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SGC API", version="1.0.0")

@app.get("/")
def health_check():
    return {"status": "ok", "mensagem": "Backend SGC operante!"}

# Exemplo de rota já conectada no banco para sua equipe seguir de base
@app.get("/produtos", response_model=list[schemas.ProdutoResponse])
def listar_produtos(db: Session = Depends(get_db)):
    produtos = db.query(models.Produto).all()
    return produtos