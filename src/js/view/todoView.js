export default function renderTodo(todo) {
    const { todoTitle, description, due, priority } = todo;
    const section = document.querySelector('.todo-section');
    const todoDiv = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = todoTitle;
    todoDiv.append(title);
    section.append(todoDiv);

    function renderDetails() {

    }
}

