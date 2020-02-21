import { limitTitle } from './projectView';

const section = document.querySelector('.todo-section');

function renderHead(title) {
  const todoHead = `<div class="col-12">
                      <h2 class="project-header">${title}</h2>
                      <div class="todo-head">
                        <h2>TODOs</h2>
                        <p><i class="fa fa-plus-circle new-todo"></i></p>
                      </div>
                    </div>`;
  return todoHead;
}

function renderForm() {
  const todoForm = `<p class= "hidden alert-message">Please fill up all the input fields.</p><div class=" row todo-form hidden">
                          <form class="new-form">
                            <input type="text" id="todoTitle" placeholder="Enter title" required/><br>
                            <input type="date" id="todoDue" required/><br>
                            <select id="priority" name="priority" required/>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="normal">Normal</option>
                            <option value="low">Low</option>
                            </select><br>
                            <textarea id="todoDescription" rows="3" cols="30" placeholder="Add description" required></textarea><br>
                            <input type="hidden" id="id" value="null"/><br>
                            <input type="button" class="btn-success" id="add-todo" value="Add">
                            <input type="button" class="btn-success hidden" id="edit-todo" value="Edit">
                          </form>
                        </div>`;
  return todoForm;
}

const clearTodo = () => {
  section.innerHTML = '';
};

function priorityColor(priority) {

  let color;
  switch (priority) {
    case 'urgent':
      color = '#f58276';
      break;
    case 'high':
      color = '#f5c276';
      break;
    case 'low':
      color = '#b1b3b2';
      break;
    default:
      color = '#76f5f1';
      break;
  }
  return color;
}

function addDetails(parent, date, description, id) {
  const detailSection = document.createElement('div');
  detailSection.classList.add('details-section', 'hidden');
  detailSection.setAttribute('id', `detail-section-${id}`);
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

function renderTodoList(project) {
  const todo = project.todoList;
  const projectsDiv = document.querySelector('.todo-list');
  projectsDiv.innerHTML = '';
  todo.forEach(todo => {
    const todoItem = document.createElement('div');
    const todoTitle = document.createElement('div');
    const visibleTodo = document.createElement('div');
    todoItem.classList.add('todo-item');
    visibleTodo.classList.add('visible-todo-item');
    todoItem.setAttribute('id', `${todo.id}-${project.id}`);
    todoTitle.classList.add('todo-title');
    const todoIcons = document.createElement('div');
    const icon1 = document.createElement('i');
    const icon2 = document.createElement('i');
    const icon3 = document.createElement('i');
    const icon4 = document.createElement('i');
    todoIcons.classList.add('todo-icons');
    icon1.classList.add('fa', 'fa-minus-circle');
    icon1.style.color = todo.status === true ? '#07a631' : '#acadac';
    icon2.classList.add('fa', 'fa-window-close', 'delete-icon');
    icon3.classList.add('fa', 'fa-pencil', 'edit-icon');
    icon4.classList.add('fa', 'fa-caret-down', 'details-icon');
    icon4.setAttribute('id', `details-${todo.id}`);
    const title = document.createElement('span');
    title.textContent = limitTitle(todo.title, 30);
    const priority = document.createElement('div');
    priority.textContent = todo.priority;
    priority.style.color = priorityColor(todo.priority);
    todoTitle.append(icon1);
    todoTitle.append(title);
    todoItem.appendChild(visibleTodo);
    visibleTodo.append(todoTitle);
    visibleTodo.append(priority);
    visibleTodo.append(todoIcons);
    todoIcons.append(icon2);
    todoIcons.append(icon3);
    todoIcons.append(icon4);
    addDetails(todoItem, todo.due, todo.description, todo.id);
    projectsDiv.append(todoItem);
  });
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

function validateForm(todo) {
  const {
    title, due, priority, description,
  } = todo;
  const message = document.querySelector('.alert-message');
  if (title === '' || due === '' || priority === '' || description === '') {
    message.classList.remove('hidden');
    return false;
  }
  if (!message.classList.contains('hidden')) {
    message.classList.add('hidden');
  }
  return true;
}

function setTodoInfo(todo) {
  document.querySelector('#todoTitle').value = todo.title;
  document.querySelector('#todoDue').value = todo.due;
  document.querySelector('#priority').value = todo.priority;
  document.querySelector('#todoDescription').value = todo.description;
  document.querySelector('#id').value = todo.id;
}

function updateTodoInfo(todo) {
  todo.title = document.querySelector('#todoTitle').value;
  todo.due = document.querySelector('#todoDue').value;
  todo.priority = document.querySelector('#priority').value;
  todo.description = document.querySelector('#todoDescription').value;
  todo.id = document.querySelector('#id').value;
}

function renderTodoSection(title) {
  const a = renderHead(title);
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

function toggleEditBtn() {
  document.getElementById('add-todo').classList.toggle('hidden');
  document.getElementById('edit-todo').classList.toggle('hidden');
}

function resetForm() {
  const form = document.querySelector('.new-form');
  form.reset();
}

function toggleDetails(id) {
  document.getElementById(`detail-section-${id}`).classList.toggle('hidden');
}

export {
  getTodoInfo, clearTodo, renderTodoSection, renderTodoList,
  toggleForm, resetForm, setTodoInfo, toggleEditBtn, updateTodoInfo, toggleDetails, validateForm,
};

