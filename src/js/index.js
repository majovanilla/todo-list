import '../css/style.scss';
import Project from './model/project';
import Todo from './model/todo';
import {
  addProject, getProjects, generateID,
  initialProject, deleteProject, findProject, validateInput, updateLocalStorage,
} from './controller/projectCtrl';
import { renderProject, clearInput, selectedProject } from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import {
  renderTodoSection, renderTodoList, clearTodo, toggleDetails,
  updateTodoInfo, setTodoInfo, getQuickTodo, renderForm,
} from './view/todoView';

function createProject(title) {
  const ID = generateID(getProjects());
  const p = Project(title, ID);
  addProject(p);
  // updateLocalStorage();
  renderProject();
  clearInput(dom.newProject);
}

function createQuickTodo(projectID) {
  const projects = getProjects();
  const project = projects.find(element => element.id === projectID);
  const projectIndex = projects.indexOf(project);
  const ID = generateID(project.todoList);
  const title = getQuickTodo();
  if (title) {
    const todo = Todo(title);
    todo.id = ID;
    todoListCtrl.addTodo(projects, projectIndex, todo);
    updateLocalStorage(projects);
    const updatedProjects = getProjects();
    const updatedProject = updatedProjects.find(element => element.id === projectID);
    renderTodoList(updatedProject);
    clearInput(document.querySelector('.quick-todo-input'));
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
    // updateLocalStorage();
    renderProject();
  };

  const addNewTodo = () => {
    const selectedProject = document.querySelector('.selected');
    const ID = parseInt(selectedProject.firstChild.id, 10);
    createQuickTodo(ID);
  };

  const addQuickTodo = (e) => {
    const selectedProject = document.querySelector('.selected');
    const ID = parseInt(selectedProject.firstChild.id, 10);
    if (e.key === 'Enter') createQuickTodo(ID);
  };

  const editBtnTodo = () => {
    const selectedProject = document.querySelector('.h2-selected');
    const projectID = parseInt(selectedProject.id, 10);
    const todoID = document.getElementById('id').value;
    const project = findProject(projectID);
    const todo = project.todoList[todoID];
    updateTodoInfo(todo);
    // updateLocalStorage();
    renderTodoList(findProject(projectID));
  };

  const todoManager = e => {
    const { id } = e.target;
    if (id) {
      const projectID = id.match(/\d$/).toString();
      const todoID = id.match(/\d+/).toString();
      const project = findProject(projectID);
      const todo = project.todoList[todoID];
      if (id.match(/edit-\d+/)) {
        const domTodo = e.target.parentNode.parentNode;
        renderForm(domTodo);
        setTodoInfo(todo);
        document.querySelector('.edit-todo').addEventListener('click', editBtnTodo);
      } else if (id.match(/delete-\d+/)) {
        todoListCtrl.deleteTodo(project, project.todoList.indexOf(todo));
        // updateLocalStorage();
        renderTodoList(project);
      } else if (id.match(/details-\d+/)) {
        toggleDetails(todoID);
      }
    }
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
      document.querySelector('.new-todo').addEventListener('click', addNewTodo);
      document.querySelector('.todo-list').addEventListener('click', todoManager);
      document.querySelector('.quick-todo-input').addEventListener('keypress', addQuickTodo);
    });
  };
  return { eventHandler };
})();

initialProject();
renderProject();
mainController.eventHandler();
