from prompt_templates.bp import get_bp_prompt
from prompt_templates.ap import get_ap_prompt

def get_prompt_for_role(motion: str, format: str, side: str, role: str) -> str:
    """
    Returns a format-specific, role-aware GPT prompt for case prep generation.
    """
    format = format.strip().lower()

    if format == "british":
        return get_bp_prompt(motion, side, role)

    elif format == "asian":
        return get_ap_prompt(motion, side, role)

    else:
        return f"❌ Unsupported format: '{format}'. Please choose 'British' or 'Asian'."