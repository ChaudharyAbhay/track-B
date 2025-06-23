import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_openai(prompt: str, temperature: float = 0.7, max_tokens: int = 600) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful debate assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens
        )

        content = response.choices[0].message.content
        return content.strip() if content else "⚠️ No response content returned by GPT."

    except Exception as e:
        return f"❗ Error calling OpenAI: {str(e)}"
