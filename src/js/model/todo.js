export default function TodoItem(title, description = null, due = null, priority = 'normal', id = null) {
  return {
    title, description, due, priority, id,
  };
}