from fastapi import APIRouter
from pydantic import BaseModel
from utils.openai_helper import call_gpt

router = APIRouter()

class PrepInput(BaseModel):
    motion: str
    side: str  # e.g., "Closing Government", "Opening Opposition"

@router.post("/")
async def generate_case_prep(data: PrepInput):
    prompt = f"""
    You're a professional debate coach preparing for a British Parliamentary debate.

    Motion: "{data.motion}"
    Side: {data.side}

    Provide:
    - A brief case stance (1-2 lines)
    - 2-3 structured arguments (with examples)
    - Potential rebuttals you may face
    - Strategic advice on framing or stakeholder focus
    """
    response = call_gpt(prompt)
    return {"prep_notes": response}
