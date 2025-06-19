from fastapi import FastAPI
from routes.speech_generator import router as speech_router
from routes.case_prep import router as prep_router
from routes.generate_poi import router as poi_router
from routes.judge import router as judge_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Debate AI API")

# For frontend calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change later while deploying (allows other domain's interction)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(speech_router, prefix="/generate_speech")
app.include_router(prep_router, prefix="/prep")
app.include_router(poi_router, prefix="/generate_poi")
app.include_router(judge_router, prefix="/judge")

@app.get("/")
def home():
    return {"status": "Peith is live"}
