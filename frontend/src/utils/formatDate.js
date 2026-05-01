export const formatDate = (dateStr) => {
  if (!dateStr) return "No deadline";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "No deadline";

  const today = new Date();
  today.setHours(0,0,0,0);
  date.setHours(0,0,0,0);

  const diff = (date - today) / (1000 * 60 * 60 * 24);

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};