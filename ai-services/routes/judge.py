from fastapi import APIRouter
from pydantic import BaseModel
from utils.openai_helper import call_gpt

router = APIRouter()

class JudgeInput(BaseModel):
    motion: str
    user_speech: str
    side: str

@router.post("/")
async def judge_speech(data: JudgeInput):
    prompt = f"""
    You're a WUDC debate adjudicator.

    Motion: "{data.motion}"
    Speaker's Side: {data.side}
    Speech: "{data.user_speech}"

    Evaluate the speech based on:
    - Structure
    - Style
    - Substance
    - Strategy

    Provide:
    - A score out of 100
    - A short justification
    - 3 pieces of feedback for improvement
    """
    response = call_gpt(prompt)
    return {"adjudication": response}
