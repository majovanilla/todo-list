const TodoItem = (title, description = null, due = null, priority = 'normal', id = null) => {

  function addTodo(projects, projectIndex, todo) {
    projects[projectIndex].todoList.push(todo);
  }

  function deleteTodo(project, index) {
    project.todoList.splice(index, 1);
  }

  return {
    title, description, due, priority, id, addTodo, deleteTodo,
  };
};


export { TodoItem as default };