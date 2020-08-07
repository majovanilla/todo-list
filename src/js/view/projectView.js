import dom from './domStrings';
import { updateCompletion, getRedAlert } from '../controller/projectCtrl';

function clearList(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function clearInput(domElement) {
  domElement.value = '';
}

const limitTitle = (title, limit = 30) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, current) => {
      if (acc + current.length <= limit) {
        newTitle.push(current);
      }
      return acc + current.length;
    }, 0);
    // return the result
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

function renderProject() {
  const projectsArr = JSON.parse(localStorage.getItem('projects'));
  const section = document.querySelector('.project-list');
  clearList(section);
  if (projectsArr !== null) {
    projectsArr.forEach((project) => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project', 'col-12');
      projectDiv.setAttribute('id', project.id);
      const h2 = document.createElement('h2');
      h2.classList.add('project-title');
      h2.textContent = limitTitle(project.title, 20);
      const icons = document.createElement('div');
      const redAlert = document.createElement('div');
      redAlert.classList.add('danger-status');
      redAlert.dataset.projectInfo = `d-${project.id}`;
      redAlert.textContent = getRedAlert(project.todoList);
      icons.append(redAlert);
      const completion = document.createElement('div');
      completion.classList.add('completion-status');
      completion.dataset.projectInfo = `c-${project.id}`;
      completion.textContent = `${updateCompletion(project)}%`;
      icons.append(completion);
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa', 'fa-window-close', 'project-delete-icon');
      icons.append(deleteIcon);
      projectDiv.append(h2);
      projectDiv.append(deleteIcon);
      section.append(projectDiv);
    });
  }
}


const selectedProject = (projectId) => {
  const previousProject = document.querySelector('.selected');
  if (previousProject) {
    previousProject.classList.remove('selected');
  }
  const h2 = document.getElementById(projectId);
  // dom.selectedProject.classList.remove('selected');
  h2.classList.add('selected');
};

const renderNav = () => {
  const markup = `<ul class="navbar">
  <li><img src="img/logo.png" alt="logo of the app"></li>
</ul>`;
  dom.mainnav.insertAdjacentHTML('afterbegin', markup);
};

/* changeClass(parent, addClass, require) {
  if (require) {
    if (!parent.classList.contains(addClass)) {
      parent.classList.add(addClass);
    }
  } else if (parent.classList.contains(addClass)) {
    parent.classList.remove(addClass);
  }

} */

export {
  clearInput, renderProject, selectedProject, renderNav, limitTitle,
};
