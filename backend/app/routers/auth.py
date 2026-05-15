from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user_models import Usuario
from app.schemas.user_schemas import LoginData, Token, UsuarioResponse
from app.core.security import verify_password, create_access_token
from app.core.dependencies import get_current_user, get_current_gestor

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/login", response_model=Token)
def login(login_data: LoginData, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == login_data.email).first()
    
    if not user or not verify_password(login_data.senha, user.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos"
        )
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}

# --- ROTAS DE TESTE ---
@router.get("/vendedor", response_model=UsuarioResponse)
def area_vendedor(current_user: Usuario = Depends(get_current_user)):
    """Passou aqui, o token é válido para qualquer nível."""
    return current_user

@router.get("/gestor", response_model=UsuarioResponse)
def area_gestor(current_user: Usuario = Depends(get_current_gestor)):
    """Passou aqui, o token é válido e a role é Gestor."""
    return current_user