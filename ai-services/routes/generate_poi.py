from fastapi import APIRouter
from pydantic import BaseModel
from utils.openai_helper import call_gpt

router = APIRouter()

class POIInput(BaseModel):
    motion: str
    user_speech: str

@router.post("/")
async def generate_poi(data: POIInput):
    prompt = f"""
    You are a high-level debater watching your opponent's speech.

    Motion: "{data.motion}"
    Opponent's Speech: "{data.user_speech}"

    Suggest 1 or 2 smart Points of Information (POIs) to interrupt with.
    Be concise, aggressive, and directly attack flawed logic or assumptions.
    """
    response = call_gpt(prompt)
    return {"pois": response}
