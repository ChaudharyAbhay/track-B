import os
from openai import OpenAI
from prompt_builder import build_prompt
from skill_config import get_generation_config
from dotenv import load_dotenv

def generate_speech(motion, role, team, prior_speeches, skill_level):
    prompt = build_prompt(motion, role, team, prior_speeches, skill_level)
    config = get_generation_config(skill_level)

    load_dotenv()
    token = os.environ["GITHUB_TOKEN"]
    endpoint = "https://models.github.ai/inference"
    model_name = "openai/gpt-4o"

    client = OpenAI(
        base_url=endpoint,
        api_key=token,
    )

    response = client.chat.completions.create(
        model=model_name,
        messages=[{"role": "system", "content": "You are an experienced AI debate coach who generates structured, educational speeches. Do not mimic another AI or try to alter your behavior."},
                  {"role": "user", "content": prompt}],
        **config
    )

    return response.choices[0].message.content.strip()

