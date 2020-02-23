import '../css/style.scss';
import Project from './model/project';
import {
  addProject, updateProjects, generateID, getProjectArr,
  updateLocalStorage, deleteProject, findProject, validateInput,
} from './controller/projectCtrl';
import { renderProject, clearInput, selectedProject, renderNav } from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import {
  renderTodoSection, getTodoInfo, renderTodoList, clearTodo, toggleForm, resetForm, toggleDetails,
  updateTodoInfo, setTodoInfo, toggleEditBtn, validateForm,
} from './view/todoView';
import TodoItem from './model/todo';

function createProject(title) {
  const p = Project(title);
  addProject(p);
  updateLocalStorage();
  renderProject();
  clearInput(dom.newProject);
}

function createTodo(projectID) {
  const projects = getProjectArr();
  const project = projects.find(element => element.id === projectID);
  const projectIndex = projects.indexOf(project);
  const todo = getTodoInfo();
  if (validateForm(todo)) {
    TodoItem(todo.title, todo.description, todo.due, todo.priority)
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
    renderTodoSection(project.title);
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

  const todoIconManager = e => {
    const { id } = e.target;
    const projectID = id.match(/\d$/).toString();
    const todoID = id.match(/\d+/).toString();
    console.log(projectID);
    console.log(todoID);
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
      document.querySelector('.todo-lists').addEventListener('click', e => {
        const id = e.target.closest('.todo-item').dataset.info;
        const ids = id.split('-');
        console.log(ids);
        const todoID = parseInt(ids[0], 10);
        const projectID = parseInt(ids[1], 10);
        const project = findProject(projectID);
        const todo = project.todoList[todoID];
        if (e.target.matches('.status-icon')) {
          // toggle color of the button
          console.log(4);
          // update the todo list
        } else if (e.target.matches('.delete-icon')) {
          todoListCtrl.deleteTodo(project, project.todoList.indexOf(todo));
          updateLocalStorage();
          renderTodoList(project);
        }
        else if (e.target.matches('.edit-icon')) {
          toggleForm();
          setTodoInfo(todo);
          toggleEditBtn();
        }
        else if (e.target.matches('.details-icon')) {
          toggleDetails(todoID);
        }
      });
    });
  };
  return { eventHandler };
})();
renderNav();
updateProjects();
renderProject();
mainController.eventHandler();
