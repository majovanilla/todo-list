function clearList(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function clearInput(domElement) {
  domElement.value = '';
}

function renderProject() {
  const projectsArr = JSON.parse(localStorage.getItem('projects'));
  const section = document.querySelector('.project-list');
  section.classList.add('row');
  clearList(section);
  if (projectsArr !== null) {
    projectsArr.forEach((project) => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project', 'col-12');
      const h2 = document.createElement('h2');
      h2.classList.add('project-title');
      h2.setAttribute('id', project.id);
      h2.textContent = project.title;
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa', 'fa-window-close', 'project-delete-icon');
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

export { clearInput, renderProject, selectedProject };
