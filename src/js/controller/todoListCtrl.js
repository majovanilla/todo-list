function addTodo(project, todo) {
    project.todoList.push(todo);
    updateLocalStorage();
}

function deleteTodo(project, index) {
    project.todoList.splice(index, 1);
    updateLocalStorage();
}

function editTodo(index, title) {
    project.todolist.[index].title = title;
    project.todolist.[index].description = description;
    project.todolist.[index].due = due;
    project.todolist.[index].priority = priority;
    updateLocalStorage();
}

export { addTodo, deleteTodo, editTodo };