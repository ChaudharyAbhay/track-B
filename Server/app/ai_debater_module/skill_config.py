def get_generation_config(skill_level):
    levels = {
        "beginner": {"temperature": 1.0, "max_tokens": 600},
        "intermediate": {"temperature": 0.8, "max_tokens": 800},
        "advanced": {"temperature": 0.6, "max_tokens": 1000}
    }
    return levels.get(skill_level.lower(), levels["intermediate"])
