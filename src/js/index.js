import '../css/style.scss';
import Project from './model/project';
import {
  addProject, updateProjects, getProjectArr,
  updateLocalStorage, deleteProject, findProject, validateInput, updateCompletion, getRedAlert,
} from './controller/projectCtrl';
import {
  renderProject, clearInput, selectedProject, renderNav,
} from './view/projectView';
import * as todoListCtrl from './controller/todoListCtrl';
import dom from './view/domStrings';
import {
  renderTodoSection, getTodoInfo, renderTodoList, clearTodo, toggleForm, resetForm, toggleDetails,
  updateTodoInfo, setTodoInfo, toggleEditBtn, validateForm,
} from './view/todoView';
import TodoItem from './model/todo';

function createProject(title) {
  getRedAlert();
  const p = Project(title);
  addProject(p);
  updateLocalStorage();
  renderProject();
  clearInput(dom.newProject);
}

function createTodo(projectID) {
  const projects = getProjectArr();
  const projectIndex = projects.findIndex(element => element.id === projectID);
  const {
    title, due, priority, description,
  } = getTodoInfo();
  if (validateForm(title, due, priority, description) !== false) {
    const newTodo = TodoItem(title, description, due, priority);
    todoListCtrl.addTodo(projects, projectIndex, newTodo);
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
    deleteProject(id);
    updateLocalStorage();
    renderProject();
  };

  const addNewTodo = () => {
    const selectedProject = document.querySelector('.selected').id;
    createTodo(selectedProject);
  };

  const editBtnTodo = () => {
    const projectID = document.querySelector('.selected').id;
    const todoID = document.getElementById('id').value;
    const project = findProject(projectID);
    const todo = project.todoList.find(ele => ele.id === todoID);
    updateTodoInfo(todo);
    updateLocalStorage();
    toggleEditBtn();
    toggleForm();
    renderTodoList(findProject(projectID));
  };

  const eventHandler = () => {
    dom.newProject.addEventListener('keypress', addNewProject);
    dom.projectDiv.addEventListener('click', e => {
      const projectID = e.target.closest('.project').id;
      if (e.target.matches('.project-delete-icon')) {
        projectDelete(projectID);
      } else {
        projectClick(projectID);
      }
    });

    dom.todoHeader.addEventListener('click', e => {
      if (e.target.matches('.new-todo')) {
        toggleForm();
      } else if (e.target.matches('.add-todo')) {
        addNewTodo();
      } else if (e.target.matches('.edit-todo')) {
        editBtnTodo();
      }
    });

    document.querySelector('.todo-lists').addEventListener('click', e => {
      const id = e.target.closest('.todo-item').dataset.info;
      const ids = id.split('-');
      const todoID = ids[0];
      const projectID = ids[1];
      const project = findProject(projectID);
      const index = project.todoList.findIndex(ele => ele.id === todoID);
      const todo = project.todoList[index];
      if (e.target.matches('.status-icon')) {
        e.target.classList.toggle('status-green');
        // update the todo list
        project.todoList[index].status = !project.todoList[index].status;
        const a = document.querySelector(`[data-projectinfo=c-${projectID}]`);
        a.textContent = updateCompletion(project);
        updateLocalStorage();
      } else if (e.target.matches('.delete-icon')) {
        todoListCtrl.deleteTodo(project, project.todoList.indexOf(todo));
        updateLocalStorage();
        renderTodoList(project);
      } else if (e.target.matches('.edit-icon')) {
        toggleForm();
        setTodoInfo(todo);
        toggleEditBtn();
      } else if (e.target.matches('.details-icon')) {
        toggleDetails(todoID);
      }
    });
  };
  return { eventHandler };
})();
renderNav();
updateProjects();
renderProject();
mainController.eventHandler();
