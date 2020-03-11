import { updateLocalStorage, getProjects } from './projectCtrl';

function findTodoIndex(project, todoID) {
  const ids = project.todoList.map(current => current.id);
  const index = ids.indexOf(parseInt(todoID, 10));
  return index;
}

function addTodo(projectIndex, todo) {
  const projects = getProjects();
  projects[projectIndex].todoList.push(todo);
  updateLocalStorage(projects);
}

function deleteTodo(projectIndex, todo) {
  const projects = getProjects();
  // const project = projects[projectIndex];
  const index = findTodoIndex(projects[projectIndex], todo);
  projects[projectIndex].todoList.splice(index, 1);
  updateLocalStorage(projects);
}

export { addTodo, deleteTodo, findTodoIndex };