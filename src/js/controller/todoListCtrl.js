import * as todoView from '../view/todoView';
import todoModel from '../model/todo';
import dom from '../view/domStrings';
import shared from '../model/shared';
import sharedView from '../shared';

const todoController = () => {
  function createQuickTodo(projectID) {
    const projects = getProjectArr();
    const project = projects.find(element => element.id === projectID);
    const projectIndex = projects.indexOf(project);
    const ID = generateID(project.todoList);
    const title = todoView.getQuickTodo();
    const todo = todoModel.Todo(title);
    todo.id = ID;
    todoModel.addTodo(projects, projectIndex, todo);
    shared.updateLocalStorage();
    const updatedProjects = getProjectArr();
    const updatedProject = updatedProjects.find(element => element.id === projectID);
    todoView.renderTodoList(updatedProject);
    sharedView.todoclearInput(document.querySelector('.quick-todo-input'));
  }

  function createTodo(projectID) {
    const projects = getProjectArr();
    const project = projects.find(element => element.id === projectID);
    const projectIndex = projects.indexOf(project);
    const ID = generateID(project.todoList);
    const todo = getTodoInfo();
    if (validateForm(todo)) {
      todo.id = ID;
      todoListCtrl.addTodo(projects, projectIndex, todo);
      updateLocalStorage();
      toggleForm();
      const updatedProjects = getProjectArr();
      const updatedProject = updatedProjects.find(element => element.id === projectID);
      renderTodoList(updatedProject);
      resetForm();
    }
  }

  const addNewTodo = () => {
    const selectedProject = document.querySelector('.selected');
    const ID = parseInt(selectedProject.firstChild.id, 10);
    createTodo(ID);
  };

  const addQuickTodo = (e) => {
    if (e.key === 'Enter') {
      const selectedProject = document.querySelector('.selected');
      const ID = parseInt(selectedProject.firstChild.id, 10);
      createQuickTodo(ID);
    }
  };

  const todoIconManager = e => {
    const { id } = e.target;
    const projectID = id.match(/\d$/).toString();
    const todoID = id.match(/\d+/).toString();
    const project = findProject(projectID);
    const todo = project.todoList[todoID];
    if (id.match(/edit-\d+/)) {
      toggleForm();
      setTodoInfo(todo);
      toggleEditBtn();
    } else if (id.match(/delete-\d+/)) {
      todoListCtrl.deleteTodo(project, project.todoList.indexOf(todo));
      updateLocalStorage();
      renderTodoList(project);
    } else if (id.match(/details-\d+/)) {
      toggleDetails(todoID);
    }
  };

  const editBtnTodo = () => {
    const selectedProject = document.querySelector('.selected');
    const projectID = parseInt(selectedProject.id, 10);
    const todoID = document.getElementById('id').value;
    const project = findProject(projectID);
    const todo = project.todoList[todoID];
    updateTodoInfo(todo);
    updateLocalStorage();
    toggleEditBtn();
    toggleForm();
    renderTodoList(findProject(projectID));
  };

  const eventHandler = () => {
    dom.newProject.addEventListener('keypress', addNewProject);
    dom.projectDiv.addEventListener('click', e => {
      let projectID;
      if (e.target.id) {
        projectClick(e.target.id);
      } else {
        projectID = e.target.parentNode.firstChild.id;
        projectDelete(projectID);
      }
      document.querySelector('.new-todo').addEventListener('click', toggleForm);
      document.getElementById('add-todo').addEventListener('click', addNewTodo);
      document.getElementById('edit-todo').addEventListener('click', editBtnTodo);
      document.querySelector('.todo-list').addEventListener('click', todoIconManager);
      document.querySelector('.quick-todo-input').addEventListener('keypress', addQuickTodo);
    });
  };
  return { eventHandler };
};

export { todoController as default };