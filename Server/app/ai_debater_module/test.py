from speech_generator import generate_speech

motion = "Generate an Opening Government speech on 'This House believes social media should be regulated'"
role = "MG"
team = "CG"
skill_level = "advanced"

prior_speeches = [
    {"speaker": "PM", "text": "Targeted ads manipulate voters..."},
    {"speaker": "LO", "text": "No, they help reach the right people..."},
    {"speaker": "DPM", "text": "We rebut their points..."},
    {"speaker": "DLO", "text": "We say bans are undemocratic..."}
]

speech = generate_speech(motion, role, team, prior_speeches, skill_level)
print(speech)
