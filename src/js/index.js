import '../css/style.scss';
import Project from './model/project';
import Todo from './model/todo';
import {
  addProject, updateProjects, generateID, getProjectArr,
  updateLocalStorage, deleteProject, findProject, validateInput,
} from './controller/projectCtrl';
import { renderProject, clearInput, selectedProject } from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import {
  renderTodoSection, getTodoInfo, renderTodoList, clearTodo, toggleForm, resetForm, toggleDetails,
  updateTodoInfo, setTodoInfo, toggleEditBtn, validateForm, getQuickTodo,
} from './view/todoView';


function createProject(title) {
  const ID = generateID(getProjectArr());
  const p = Project(title, ID);
  addProject(p);
  updateLocalStorage();
  renderProject();
  clearInput(dom.newProject);
}

function createQuickTodo(projectID) {
  const projects = getProjectArr();
  const project = projects.find(element => element.id === projectID);
  const projectIndex = projects.indexOf(project);
  const ID = generateID(project.todoList);
  const title = getQuickTodo();
  const todo = Todo(title);
  todo.id = ID;
  todoListCtrl.addTodo(projects, projectIndex, todo);
  updateLocalStorage();
  const updatedProjects = getProjectArr();
  const updatedProject = updatedProjects.find(element => element.id === projectID);
  renderTodoList(updatedProject);
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

const mainController = (() => {
  const addNewProject = (e) => {
    if (e.key === 'Enter') {
      const projectTitle = dom.newProject;
      if (validateInput(projectTitle)) {
        createProject(projectTitle.value);
      }
    }
  };

  const projectClick = (projectId) => {
    const project = findProject(projectId);
    clearTodo();
    selectedProject(projectId);
    renderTodoSection();
    renderTodoList(project);
  };

  const projectDelete = (id) => {
    const ID = parseInt(id, 10);
    deleteProject(ID);
    updateLocalStorage();
    renderProject();
  };

  const addNewTodo = () => {
    const selectedProject = document.querySelector('.selected');
    const ID = parseInt(selectedProject.id, 10);
    createTodo(ID);
  };

  const addQuickTodo = () => {
    const selectedProject = document.querySelector('.selected');
    const ID = parseInt(selectedProject.id, 10);
    createQuickTodo(ID);
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
})();

updateProjects();
renderProject();
mainController.eventHandler();
