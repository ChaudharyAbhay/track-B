from fastapi import APIRouter, Request
from pydantic import BaseModel
from utils.openai_helper import call_gpt

router = APIRouter()

class SpeechInput(BaseModel):
    motion: str
    side: str  # e.g., "Opening Government", "Closing Opposition"

@router.post("/")
async def generate_speech(data: SpeechInput):
    prompt = f"""
    You are a skilled British Parliamentary debater.
    Motion: "{data.motion}"
    Side: {data.side}

    Generate a 5-minute constructive speech.
    Include 2-3 clear arguments, setup, and conclusion.
    """
    response = call_gpt(prompt)
    return {"speech": response}
