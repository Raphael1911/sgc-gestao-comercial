from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user_models import Usuario
from app.schemas.user_schemas import UsuarioCreate, UsuarioResponse
from app.core.security import get_password_hash
from app.core.dependencies import get_current_gestor

# O prefixo /usuarios será usado para todas as rotas aqui dentro
router = APIRouter(prefix="/usuarios", tags=["Usuários"])

# Note que usamos o 'get_current_gestor' aqui. Se um Vendedor tentar criar outro usuário, o backend bloqueia na hora!
@router.post("/", response_model=UsuarioResponse, status_code=status.HTTP_201_CREATED)
def criar_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db), gestor_logado: Usuario = Depends(get_current_gestor)):
    
    # 1. Verifica se o e-mail já está cadastrado no banco
    usuario_existente = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este e-mail já está em uso."
        )

    # 2. Transforma a senha limpa em Hash
    senha_criptografada = get_password_hash(usuario.senha)

    # 3. Cria o modelo para salvar no banco
    novo_usuario = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha_hash=senha_criptografada,
        role=usuario.role
    )

    # 4. Salva e confirma a transação
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario) # Atualiza para pegar o ID que o banco gerou

    # Retorna os dados do novo usuário (o response_model vai esconder a senha automaticamente)
    return novo_usuario