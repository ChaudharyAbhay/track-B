from fastapi import APIRouter, Depends, HTTPException
from app.models import User
from app.utils.auth import get_current_user_from_token
from app.schemas.user import UserOut
from sqlalchemy.orm import Session
from app.services.database import get_db
from app.services.hashing import hash_password
from app.models.user import User
from app.schemas.user import UserCreate

router = APIRouter()

@router.post("/auth/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(get_current_user_from_token)):
    return current_user
