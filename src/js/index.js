import '../css/style.scss';
import project from './model/project';
import { addProject, projects, deleteProject } from './controller/projectCtrl';
import todoItem from './model/todo';
import renderProject from './view/projectView';

// const project = projectCtrl.project('New project title');

// console.log(project);

// const mainController = (() => {
//     const eventHandler = () => {

//     }
// })();

function updateLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function createProject(title) {
    const project1 = project(title);
    addProject(project1);
    renderProject(title);
}


createProject("TODO list js project");
createProject("Library js project");
// const todo1 = todoItem("Create frontend part");
// project1.todoList.push(todo1);
// console.log(project1);
console.log(projects);