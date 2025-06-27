def build_prompt(motion, role, team, prior_speeches, skill_level):
    context = "\n\n".join([f"{sp['speaker']}: {sp['text']}" for sp in prior_speeches])
    
    instructions = {
        'PM': "Present the government’s case. Define the motion clearly. Give 2–3 contentions.",
        'DPM': "Rebuild PM’s case. Refute the LO’s arguments. Add one new point.",
        'MG': "Bring a unique new extension that’s not from OG. Rebut OO.",
        'GW': "Summarize CG’s case. Weigh clashes across benches.",
        'LO': "Respond to PM. Present opposition case clearly.",
        'DLO': "Rebuild LO. Refute DPM. Add one point.",
        'MO': "Bring a unique extension for opposition. Refute CG.",
        'OW': "Summarize opposition. Weigh clashes across the table."
    }
    
    prompt = f"""
You are the {role} from the {team} bench in a British Parliamentary debate on the motion:
"{motion}"

Context from prior speeches:
{context}

Your task:
{instructions.get(role, 'Generate your speech according to your team role.')}

Speak in {skill_level.upper()} style: structured, relevant, and time-bound (7 min max).
"""
    return prompt.strip()
