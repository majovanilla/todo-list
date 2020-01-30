export default function TodoItem(title, description = null, due = null, priority = null) {
  return {
    title, description, due, priority,
  };
}