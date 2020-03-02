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


create project

create quick todo

create todo

const mainController = (() => {
  add new project

  project click


  add quick todo

  todo icon manager

  edito todo icon


})();

updateProjects();
renderProject();
mainController.eventHandler();
