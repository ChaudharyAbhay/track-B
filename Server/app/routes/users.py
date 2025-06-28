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



router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(get_current_user_from_token)):
    return current_user
