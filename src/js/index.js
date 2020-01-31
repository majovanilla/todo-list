import '../css/style.scss';
import Project from './model/project';
import { addProject, updateProjects, getProjectArr, updateLocalStorage, deleteProject, findProject } from './controller/projectCtrl';
import TodoItem from './model/todo';
import { renderProject, clearInput } from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import renderProjectTodos from './view/todoView';

function createProject(title) {
  const p = Project(title);
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

  const projectClick = event => {
    const projectId = event.target.id;
    console.log(projectId);
    const project = findProject(projectId);
    console.log(project);
    renderProjectTodos(project);
  };

  const eventHandler = () => {
    dom.newProject.addEventListener('keypress', addNewProject);
    dom.projectDiv.addEventListener('click', projectClick);
  };

  return { eventHandler };
})();

updateProjects();

renderProject();

mainController.eventHandler();
