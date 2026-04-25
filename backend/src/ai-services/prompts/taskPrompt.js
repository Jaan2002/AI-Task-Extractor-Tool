const buildPrompt = (text) => {
  return `
Extract ALL tasks from the conversation.

Return ONLY JSON array:
[
  {
    "title": "",
    "assigned_to": "",
    "assigned_by": "",
    "deadline": "",
    "priority": ""
  }
]

Rules:
- Extract explicit tasks AND implicit tasks
- Convert suggestions into actionable tasks
- Each idea/action = separate task
- Never combine tasks

Examples:
"We should improve UI" → "Improve UI"
"Login is slow" → "Fix login performance"

Defaults:
- assigned_to: "Unassigned"
- assigned_by: "System"
- priority: infer (urgent = High, later = Low, else Medium)

Do NOT leave fields empty

Conversation:
${text}
`;
};

module.exports = { buildPrompt };