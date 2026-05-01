const { extractTasksFromAI } = require("../ai-services/processors/taskProcessor");
const Task = require("../models/Tasks");
const generateTaskId = () => {
  return `TASK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

//name-uppercase
const capitalize = (name) =>name.charAt(0).toUpperCase() + name.slice(1);

//priority
const inferPriority = (text) => {
  const lower = text.toLowerCase();

  if (lower.includes("urgent") || lower.includes("asap")) return "High";
  if (lower.includes("later") || lower.includes("optional")) return "Low";

  return "Medium";
};

// parse deadline
const parseDeadline = (deadline) => {
  if (!deadline) return null;

  const text = deadline.toLowerCase();
  const now = new Date();

  // TODAY
  if (text.includes("today")) return now;

  // TOMORROW
  if (text.includes("tomorrow")) {
    const t = new Date();
    t.setDate(now.getDate() + 1);
    return t;
  }

  //  WEEKDAYS SUPPORT
  const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

  for (let i = 0; i < days.length; i++) {
    if (text.includes(days[i])) {
      const targetDay = i;
      const currentDay = now.getDay();

      let diff = targetDay - currentDay;

      if (diff <= 0) diff += 7; // next week

      const targetDate = new Date();
      targetDate.setDate(now.getDate() + diff);

      return targetDate;
    }
  }

  // NORMAL DATE
  const parsed = new Date(deadline);
  return isNaN(parsed) ? null : parsed;
};

//remove duplicates
const removeDuplicates = (tasks) => {
  const seen = new Set();

  return tasks.filter(task => {
    const key = task.title.toLowerCase().trim();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

//confidence-correctness
const calculateConfidence = (task) => {
  let score = 0;

  if (task.title) score += 0.4;
  if (task.assigned_to && task.assigned_to !== "Unassigned") score += 0.2;
  if (task.deadline && task.deadline !== "No deadline") score += 0.2;
  if (task.priority) score += 0.2;

  if (score >= 0.8) return "High";
  if (score >= 0.5) return "Medium";
  return "Low";
};

const processText = async (text, source = "manual") => {

  const aiResponse = await extractTasksFromAI(text);

  // console.log("RAW AI RESPONSE:", aiResponse);

  let tasks = [];

try {
  const jsonMatch = aiResponse.match(/\[.*\]/s);

  if (jsonMatch) {
    tasks = JSON.parse(jsonMatch[0]);
  } else {
    console.log("No valid JSON found");
  }

} catch (error) {
  console.error("Parsing error:", error);
}

  //  Add fallback + formatting
  
  tasks = removeDuplicates(tasks);

  const formattedTasks = tasks.map(task => ({
    id: generateTaskId(),

    title: task.title?.trim() || "Untitled Task",

    assigned_to: task.assigned_to
  ? capitalize(task.assigned_to)
  : "Unassigned",

     assigned_by: task.assigned_by?.trim()
      ? task.assigned_by
      : "System",
     
     deadline: parseDeadline(task.deadline),

     priority: task.priority?.trim()
      ? task.priority
      : inferPriority(text),

      source: source,
      confidence: calculateConfidence(task)
  }));
  
  await Task.insertMany(formattedTasks);
  return { tasks: formattedTasks };
};

module.exports = { processText };