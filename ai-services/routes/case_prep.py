from prompt_templates import ap
from utils.openai_helper import call_openai
import re


pm_prompt = ap.pm_prompt(motion)
lo_prompt = ap.lo_prompt(motion, pm_case)
dpm_prompt = ap.dpm_prompt(motion, lo_case)
dlo_prompt = ap.dlo_prompt(motion, dpm_case)

def generate_case(motion: str, format: str, side: str, role: str) -> dict:
    """
    Generates a debate case based on motion, format, side, and role.
    Currently uses prompt template and OpenAI call.
    """

    # Get the role-specific prompt (BP/AP)
    prompt = get_prompt_for_role(motion, format, side, role)

    try:
        raw_response = call_openai(prompt)
        parsed = extract_sections(raw_response)
    except Exception as e:
        return {"error": str(e), "prompt": prompt}

    return {
        "role": role,
        "side": side,
        "format": format,
        "motion": motion,
        "prompt_used": prompt,
        "raw_response": raw_response,
        "case_outline": parsed  # ✅ Structured response
    }

def extract_sections(text: str) -> dict:
    """
    Parses GPT output into structured debate components.
    Supports markdown-style or bold headers.
    """
    sections = {
        "intro": "",
        "key_arguments": [],
        "rebuttal_prep": [],
        "examples": [],
        "style_advice": ""
    }

    # Normalize section headers
    normalized = text.lower()

    # Use regex to split sections
    parts = re.split(r"(##|###|--)\s*(introduction|key arguments|rebuttal prep(?:aration)?|examples|style advice)\s*", text, flags=re.IGNORECASE)

    current_section = None
    for i in range(len(parts)):
        part = parts[i].strip()

        if part.lower() in ["introduction", "key arguments", "rebuttal prep", "rebuttal preparation", "examples", "style advice"]:
            current_section = part.lower()
            continue

        if current_section:
            content = part.strip()
            if current_section == "introduction":
                sections["intro"] = content
            elif current_section.startswith("key arguments"):
                sections["key_arguments"] = [arg.strip("-•0123456789. ") for arg in content.split("\n") if arg.strip()]
            elif current_section.startswith("rebuttal"):
                sections["rebuttal_prep"] = [reb.strip("-•0123456789. ") for reb in content.split("\n") if reb.strip()]
            elif current_section == "examples":
                sections["examples"] = [ex.strip("-•0123456789. ") for ex in content.split("\n") if ex.strip()]
            elif current_section == "style advice":
                sections["style_advice"] = content

            current_section = None

    return sections