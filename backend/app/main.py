from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# Importando a Base e os models
from app.models import models, user_models 
from app.schemas import schemas
from app.core.database import engine, get_db

# Importando o roteador de autenticação e o "porteiro" (dependência de segurança)
from app.routers import auth, usuarios
from app.core.dependencies import get_current_user

# Cria as tabelas no banco se ainda não existirem
# É importante importar o user_models acima para o SQLAlchemy saber que a tabela 'usuarios' existe
models.Base.metadata.create_all(bind=engine)
user_models.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="SGC API", version="1.0.0")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler) # type: ignore

origens_permitidas = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origens_permitidas,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# ---------------------------------------------------
# REGISTRO DE ROTAS
# ---------------------------------------------------
app.include_router(auth.router)
app.include_router(usuarios.router)


# ---------------------------------------------------
# ENDPOINTS
# ---------------------------------------------------
@app.get("/")
@limiter.limit("5/minute")
def health_check(request: Request): 
    return {"status": "ok", "mensagem": "Backend SGC operante e blindado!"}

# ROTA PROTEGIDA: Exige que o usuário esteja autenticado (Vendedor ou Gestor)
@app.get("/produtos", response_model=list[schemas.ProdutoResponse])
def listar_produtos(
    request: Request, # O request fica aqui caso precise usar o @limiter nesta rota no futuro
    db: Session = Depends(get_db),
    current_user: user_models.Usuario = Depends(get_current_user) # Isso é o que bloqueia o acesso sem token!
):
    produtos = db.query(models.Produto).all()
    return produtos