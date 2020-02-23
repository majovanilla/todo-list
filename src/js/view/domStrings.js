const dom = {
  newProject: document.querySelector('.add-project'),
  projectDiv: document.querySelector('.project-list'),
  project: document.querySelector('.project'),
  projectTitle: document.querySelector('.project-title'),
  deleteProject: document.querySelector('.project-delete-icon'),
  selectedProject: document.querySelector('.selected'),
  newTodo: document.querySelector('.new-todo'),
  todoTitle: document.querySelector('#todoTitle'),
  todoDue: document.querySelector('#todoDue'),
  priority: document.querySelector('#priority'),
  todoDescription: document.querySelector('#todoDescription'),
  newTodoBtn: document.getElementById('add-todo'),
  deleteTodo: document.querySelector('.delete-icon'),
  editTodo: document.querySelector('.edit-icon'),
  mainnav: document.querySelector('.main-nav'),
  todoHeader: document.querySelector('.todo-header-section'),
};

export default dom;