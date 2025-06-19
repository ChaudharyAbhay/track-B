import os
import openai
from dotenv import load_dotenv
load_dotenv() 
openai.api_key = os.getenv("OPENAI_API_KEY")



def call_gpt(prompt, temperature=0.7, max_tokens=600):
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # change the models as some might not work properly
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            max_tokens=max_tokens,
        )
        return response['choices'][0]['message']['content'].strip()
    except openai.error.OpenAIError as e:
        print("OpenAI error:", e) #remove it later as no console commands should be in the final version
        return "AI temporarily unavailable. Please try again."
    except Exception as e:
        return f"❗ Error: {str(e)}"
