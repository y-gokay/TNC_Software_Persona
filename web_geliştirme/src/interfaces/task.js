export function createTask({ title, description, priority }) {
  return {
    id: Date.now(),
    title: title.trim(),
    description: (description || "").trim(),
    status: "pending",
    priority: priority || "medium",
    createdAt: new Date().toISOString().slice(0, 10),
  };
}
