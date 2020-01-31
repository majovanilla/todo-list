function addTodo(projects, projectIndex, todo) {
  projects[projectIndex].todoList.push(todo);
}

function deleteTodo(list, id) {
  const ids = list.map(current => current.id);

  const index = ids.indexOf(id);
  if (index !== -1) {
    list.splice(index, 1);
  }
}

// Check this function!!
// function editTodo(project, todo) {
//   const { title, description, due, priority } = todo;
// }

export { addTodo, deleteTodo };