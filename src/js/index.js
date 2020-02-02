import '../css/style.scss';
import Project from './model/project';
import { addProject, updateProjects, generateID, getProjectArr, updateLocalStorage, deleteProject, findProject } from './controller/projectCtrl';
import TodoItem from './model/todo';
import { renderProject, clearInput, selectedProject } from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import {
  renderTodoSection, getTodoInfo, renderTodoList, clearTodo, toggleForm, resetForm,
} from './view/todoView';


// OK
function createProject(title) {
  const ID = generateID(getProjectArr());
  const p = Project(title, ID);
  addProject(p);
  updateLocalStorage();
  renderProject();
  clearInput(dom.newProject);
}

function createTodo(projectID) {
  const projects = getProjectArr();
  const project = projects.find(element => element.id === projectID);
  const projectIndex = projects.indexOf(project);
  const ID = generateID(project.todoList);
  const todo = getTodoInfo();
  todo.id = ID;
  todoListCtrl.addTodo(projects, projectIndex, todo);
  updateLocalStorage();
  toggleForm();
  const updatedProjects = getProjectArr();
  const updatedProject = updatedProjects.find(element => element.id === projectID);
  renderTodoList(updatedProject);
  resetForm();
}

// OK
const mainController = (() => {
  const addNewProject = (e) => {
    if (e.key === 'Enter') {
      const projectTitle = dom.newProject.value;
      createProject(projectTitle);
    }
  };

  //OK
  const projectClick = (projectId) => {
    const project = findProject(projectId);
    clearTodo();
    selectedProject(projectId);
    renderTodoSection();
    renderTodoList(project);
  };

  //OK
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
    });
  };
  return { eventHandler };
})();
updateProjects();
renderProject();
mainController.eventHandler();
