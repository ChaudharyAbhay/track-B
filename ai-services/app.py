from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.case_prep import router as prep_router

app = FastAPI(title="Debate AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include only ready routes
app.include_router(prep_router, prefix="/prep")

@app.get("/")
def home():
    return {"status": "Peith is live"}
