function addTodo(project, todo) {
  project.todoList.push(todo);
  todo.id = project.todoList.indexOf(todo);
}

function deleteTodo(project, index) {
  project.todoList.splice(index, 1);
}

// Check this function!!
// function editTodo(project, todo) {
//   const { title, description, due, priority } = todo;
// }

export { addTodo, deleteTodo };