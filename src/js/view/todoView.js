const section = document.querySelector('.todo-section');

function renderHead() {
  const todoHead = `<div class="col-12 todo-head">
                        <h2 class="todo-head">List of TODOs</h2>
                        <p><i class="fa fa-plus-circle new-todo"></i></p>
                      </div>`;
  return todoHead;
}

function renderForm() {
  const todoForm = `<div class=" row todo-form hidden">
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
                            <button type="button" class="btn-lg btn-success" id="add-todo">Add</button>
                          </form>
                        </div>`;
  return todoForm;
}

const clearTodo = () => {
  section.innerHTML = '';
};

function renderTodoList(project) {
  const todo = project.todoList;
  const projectsDiv = document.querySelector('.todo-list');
  projectsDiv.innerHTML = '';
  todo.forEach(todo => {
    const todoItem = document.createElement('div');
    const todoTitle = document.createElement('div');
    todoItem.classList.add('todo-item', 'row', 'my-3');
    todoItem.setAttribute('id', todo.id);
    todoTitle.classList.add('todo-title', 'col-8');
    const todoIcons = document.createElement('div');
    const icon1 = document.createElement('i');
    const icon2 = document.createElement('i');
    const icon3 = document.createElement('i');
    const icon4 = document.createElement('i');
    todoIcons.classList.add('todo-icons', 'col-3');
    icon1.classList.add('fa', 'fa-chevron-right');
    icon2.classList.add('fa', 'fa-window-close', 'delete-icon');
    icon2.setAttribute('id', `delete-${todo.id}`);
    icon3.classList.add('fa', 'fa-pencil', 'edit-icon');
    icon3.setAttribute('id', `edit-${todo.id}`);
    icon4.classList.add('fa', 'fa-caret-down', 'details-icon');
    const title = document.createElement('span');
    title.textContent = todo.title;
    const priority = document.createElement('span');
    priority.classList.add('priority-status');
    priority.textContent = todo.priority;
    todoTitle.append(icon1);
    todoTitle.append(title);
    todoItem.appendChild(priority);
    todoTitle.append(icon1);
    todoTitle.append(title);
    todoItem.append(todoTitle);
    todoItem.append(todoIcons);
    todoIcons.append(icon2);
    todoIcons.append(icon3);
    todoIcons.append(icon4);
    addDetails(todoItem, todo.due, todo.description);
    projectsDiv.append(todoItem);

  });
}
function addDetails(parent, date, description) {
  const detailSection = document.createElement('div');
  detailSection.classList.add('row', 'col-12', 'details-section');
  const dueDate = document.createElement('p');
  const listIcon1 = document.createElement('i');
  listIcon1.classList.add('fa', 'fa-chevron-right');
  const due = document.createElement('span');
  due.textContent = `Due Date: ${date}`;
  const descriptionSection = document.createElement('p');
  const listIcon2 = document.createElement('i');
  listIcon2.classList.add('fa', 'fa-chevron-right');
  const desc = document.createElement('span');
  desc.textContent = `Description: ${description}`;
  dueDate.append(listIcon1);
  dueDate.append(due);
  descriptionSection.append(listIcon2);
  descriptionSection.append(desc);
  detailSection.append(dueDate);
  detailSection.append(descriptionSection);
  parent.append(detailSection);
}

function getTodoInfo() {
  const todo = {
    title: document.querySelector('#todoTitle').value,
    due: document.querySelector('#todoDue').value,
    priority: document.querySelector('#priority').value,
    description: document.querySelector('#todoDescription').value,
  };
  return todo;
}

function renderTodoSection() {
  const a = renderHead();
  section.insertAdjacentHTML('afterbegin', a);
  const b = renderForm();
  section.insertAdjacentHTML('beforeend', b);
  const div = document.createElement('div');
  div.classList.add('todo-list', 'col-12');
  section.append(div);
}

function toggleForm() {
  document.querySelector('.todo-form').classList.toggle('hidden');
}

export { getTodoInfo, clearTodo, renderTodoSection, renderTodoList, toggleForm };

// function renderDetails() {
//   const { todoTitle, description, due, priority } = todo;
//   const section = document.querySelector('.todo-section');
//   const todoDiv = document.createElement('div');
//   const title = document.createElement('h3');
//   title.textContent = todoTitle;
//   todoDiv.append(title);
//   section.append(todoDiv);
// }