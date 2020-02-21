export default function TodoItem(title, description = null, due = null, priority = 'normal', id = null, status = false) {
  return {
    title, description, due, priority, id, status,
  };
}