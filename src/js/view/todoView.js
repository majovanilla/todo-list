const section = document.querySelector('.todo-section');

function renderHead() {
  const todoHead = `<div class="col-12 todo-head">
                        <h2 class="todo-head">List of TODOs</h2>
                        <p><i class="fa fa-plus-circle new-todo"></i></p>
                      </div>`;
  section.innerHTML += todoHead;
}

function renderForm() {
  const todoForm = `<div class=" row todo-form">
                          <form class="new-form">
                            <input type="text" id="todoTitle" placeholder="Enter title"><br>
                            <input type="date" id="todoDue" placeholder="Add due date"><br>
                            <select id="priority" name="priority">
                              <option value="urgent">Urgent</option>
                              <option value="high">High</option>
                              <option value="normal">Normal</option>
                              <option value="low">Low</option>
                            </select><br>
                            <textarea id="todoDescription" rows="3" cols="30" placeholder="Add description"></textarea><br>
                            <button class="btn-lg btn-success" id="add-todo">Add</button>
                          </form>
                        </div>`;
  section.innerHTML += todoForm;
}
const clearTodo = () => {
  section.innerHTML = '';
};

function renderTodoList(project) {
  const todo = project.todoList;
  const todoListDiv = document.createElement('div');
  todoListDiv.classList.add('todo-list', 'col-12');

  todo.forEach(todo => {
    const todoItem = document.createElement('div');
    const todoTitle = document.createElement('div');
    todoItem.classList.add('todo-item', 'row', 'my-3');
    todoItem.setAttribute('id', todo.id);
    todoTitle.classList.add('todo-title', 'col-9');
    const todoIcons = document.createElement('div');
    const icon1 = document.createElement('i');
    const icon2 = document.createElement('i');
    const icon3 = document.createElement('i');
    todoIcons.classList.add('todo-icons');
    icon1.classList.add('fa', 'fa-chevron-right');
    icon2.classList.add('fa', 'fa-window-close', 'delete-icon', 'col-6');
    icon3.classList.add('fa', 'fa-pencil', 'edit-icon');
    const title = document.createElement('span');
    title.textContent = todo.title;
    todoTitle.append(icon1);
    todoTitle.append(title);
    todoItem.append(todoTitle);
    todoItem.append(todoIcons);
    todoIcons.append(icon2);
    todoIcons.append(icon3);
    todoListDiv.append(todoItem);
  });
  section.append(todoListDiv);
}

const clearTodo = () => {
  section.innerHTML = '';
};

export default function renderProjectTodos(project) {
  clearTodo();
  renderHead();
  renderForm();
  renderTodoList(project);
}

// function renderDetails() {
//   const { todoTitle, description, due, priority } = todo;
//   const section = document.querySelector('.todo-section');
//   const todoDiv = document.createElement('div');
//   const title = document.createElement('h3');
//   title.textContent = todoTitle;
//   todoDiv.append(title);
//   section.append(todoDiv);
// }