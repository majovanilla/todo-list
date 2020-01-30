import '../css/style.scss';
import Project from './model/project';
import { addProject, projects, deleteProject } from './controller/projectCtrl';
import TodoItem from './model/todo';
import renderProject from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl'

// const mainController = (() => {
//     const eventHandler = () => {

//     }
// })();

function updateLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function createProject(title) {
  const p = Project(title);
  addProject(p);
  updateLocalStorage();
  renderProject();
}


const p1 = createProject("TODO list js project");
const p2 = createProject("Library js project");
console.log(p1);
console.log(projects);
