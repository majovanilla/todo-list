function clearList(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
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
  const previousProject = document.querySelector('.h2-selected');
  if (previousProject) {
    previousProject.classList.remove('h2-selected');
    previousProject.nextElementSibling.classList.remove('delete-icon-selected');
    previousProject.parentElement.classList.remove('selected');
  }
  const h2 = document.getElementById(projectId);
  h2.classList.add('h2-selected');
  h2.nextElementSibling.classList.add('delete-icon-selected');
  h2.parentElement.classList.add('selected');
};

export { clearInput, renderProject, selectedProject };
