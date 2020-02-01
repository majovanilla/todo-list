import '../css/style.scss';
import Project from './model/project';
import { addProject, updateProjects, generateID, getProjectArr, updateLocalStorage, deleteProject, findProject } from './controller/projectCtrl';
import TodoItem from './model/todo';
import { renderProject, clearInput, selectedProject } from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import { renderProjectTodos, getTodoInfo, renderTodoList } from './view/todoView';

updateProjects();
renderProject();
renderProjectTodos();

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
  // updateLocalStorage();
  //const uprojects = getProjectArr();
  //renderTodoList(uprojects[projectIndex]);
  //clearInput(dom.newProject);
}

const mainController = (() => {
  const addNewProject = (e) => {
    if (e.key === 'Enter') {
      const projectTitle = dom.newProject.value;
      createProject(projectTitle);
    }
  };

  const projectClick = (projectId) => {
    const project = findProject(projectId);
    selectedProject(projectId);
    renderTodoList(project);
  };

  const projectDelete = (id) => {
    const ID = parseInt(id, 10);
    deleteProject(ID);
    updateLocalStorage();
    renderProject();
  };

  const addButtonAction = () => {
    const selectedProject = document.querySelector('.selected');
    const ID = parseInt(selectedProject.id, 10);
    createTodo(ID);
    renderTodoList(findProject(ID));
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
    });
    document.getElementById('add-todo').addEventListener('click', addButtonAction);
  };
  return { eventHandler };
})();

mainController.eventHandler();
