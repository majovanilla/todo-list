export default function TodoItem(title, description = null, due = null, priority = null, id = null) {
  return {
    title, description, due, priority, id,
  };
}