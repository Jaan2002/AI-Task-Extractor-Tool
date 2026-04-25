const client = require("../aiClient");
const { buildPrompt } = require("../prompts/taskPrompt");

const extractTasksFromAI = async(text)=>{
    const prompt = buildPrompt(text);
    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-120b:free",
        messages: [
          { role: "system", content: "You are a task extraction assistant." },
          { role: "user", content: prompt }
        ]
    });
    console.log("Calling AI...");
     const result = response.choices[0].message.content;
     return result;

};

module.exports = { extractTasksFromAI };