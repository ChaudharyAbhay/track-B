# prompt_templates/ap.py

def pm_prompt(motion: str) -> str:
    return f"""
You are the **Prime Minister (PM)** in an Asian Parliamentary debate. Your role is to **propose** the motion:

**Motion:** {motion}

---

### TASK STRUCTURE

1. **Understand the motion**:
   - Define key terms and interpret the motion fairly.
   - Frame the debate and present the **status quo** if applicable.

2. **Draft your Prime Minister's speech** with:
   - **Introduction**: Hook, brief background, and framing.
   - **Team Line**: What does your side believe? What's your burden of proof?
   - **2-3 Key Arguments**: With clear logic and impact analysis.
   - **Examples**: Real-world examples to back each point.
   - **Rebuttal Anticipation**: What might the Opposition say? Pre-emptively counter it.
   - **Style Advice**: Delivery suggestions (tone, pacing, rhetorical techniques).

3. **Output Format**:
Return the final content in the following Markdown + JSON-style structure:

```markdown
# Prime Minister's Case

## Introduction
...

## Team Line
...

## Arguments
1. Argument Title
   - Explanation: ...
   - Impact: ...
   - Example: ...

2. Argument Title
   ...

## Rebuttal Anticipation
...

## Style Advice
...

```json
{{
  "role": "PM",
  "intro": "...",
  "team_line": "...",
  "arguments": [
    {{
      "title": "...",
      "explanation": "...",
      "impact": "...",
      "example": "..."
    }},
    ...
  ],
  "rebuttal_anticipation": "...",
  "style_advice": "..."
}}
"""