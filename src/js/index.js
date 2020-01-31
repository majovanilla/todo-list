import '../css/style.scss';
import Project from './model/project';
import { addProject, updateProjects, generateID, getProjectArr, updateLocalStorage, deleteProject, findProject } from './controller/projectCtrl';
import TodoItem from './model/todo';
import { renderProject, clearInput } from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import renderProjectTodos from './view/todoView';

function createProject(title) {
  const ID = generateID();
  const p = Project(title, ID);
  addProject(p);
  updateLocalStorage();
  renderProject();
  clearInput(dom.newProject);
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
    renderProjectTodos(project);
  };

  const projectDelete = (id) => {
    const ID = parseInt(id, 10);
    deleteProject(ID);
    updateLocalStorage();
    renderProject();
  };

  const eventHandler = () => {
    dom.newProject.addEventListener('keypress', addNewProject);
    dom.projectDiv.addEventListener('click', e => {
      if (e.target.id) {
        projectClick(e.target.id);
      } else {
        const projectID = e.target.parentNode.firstChild.id;
        projectDelete(projectID);
      }
    });
  };

  return { eventHandler };
})();

updateProjects();

renderProject();

mainController.eventHandler();
