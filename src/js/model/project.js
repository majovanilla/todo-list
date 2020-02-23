import uniqid from 'uniqid';

export default function Project(title, todoList = []) {
  const id = uniqid();
  return { title, id, todoList };
}
