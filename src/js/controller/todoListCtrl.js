function addTodo(projects, projectIndex, todo) {
  projects[projectIndex].todoList.push(todo);
}

function deleteTodo(project, index) {
  project.todoList.splice(index, 1);
}

export { addTodo, deleteTodo };