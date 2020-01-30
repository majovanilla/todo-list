import '../css/style.scss';
import Project from './model/project';
import { addProject, updateProjects, getProjectArr, updateLocalStorage, deleteProject } from './controller/projectCtrl';
import TodoItem from './model/todo';
import renderProject from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';

function createProject(title) {
  const p = Project(title);
  addProject(p);
  updateLocalStorage();
  renderProject();
}

const mainController = (() => {
  const addNewProject = (e) => {
    if (e.key === 'Enter') {
      const projectTitle = dom.newProject.value;
      createProject(projectTitle);
    }
  };
  const eventHandler = () => {
    dom.newProject.addEventListener('keypress', addNewProject);
  };
  return { eventHandler };
})();
updateProjects();
renderProject();
mainController.eventHandler();
