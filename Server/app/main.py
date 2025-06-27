from fastapi import FastAPI
from app.services.database import Base, engine
from app.routes import auth, users

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)

from app.services.config import settings
print("✅ ENV LOADED:", settings.DB_USERNAME, settings.DB_NAME)
