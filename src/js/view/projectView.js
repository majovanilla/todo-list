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
      projectDiv.setAttribute('id', project.id);
      const h2 = document.createElement('h2');
      h2.classList.add('project-title');
      h2.textContent = project.title;
      projectDiv.append(h2);
      section.append(projectDiv);
    });
  }
}


export { clearInput, renderProject };