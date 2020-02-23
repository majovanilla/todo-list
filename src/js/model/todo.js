import uniqid from 'uniqid';

export default function TodoItem(title, description = null, due = null, priority = 'normal', status = false) {
  const id = uniqid();
  return {
    title, description, due, priority, status, id,
  };
}