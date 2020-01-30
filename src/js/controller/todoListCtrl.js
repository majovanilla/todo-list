function addTodo(project, todo) {
  project.todoList.push(todo);
}

function deleteTodo(project, index) {
  project.todoList.splice(index, 1);
}

// Check this function!!
function editTodo(project, todo) {
  const { titile, description, due, priority } = todo;
}

export { addTodo, deleteTodo, editTodo };