let projects = [{ title: 'Default project', id: 0, todoList: [] }];

function updateProjects() {
  const localStorageArr = JSON.parse(localStorage.getItem('projects'));
  if (localStorageArr) {
    projects = [...localStorageArr];
  }
}

function getProjectArr() {
  return projects;
}

function addProject(newProject) {
  projects.push(newProject);
}

function deleteProject(id) {
  const ids = projects.map(current => current.id);

  const index = ids.indexOf(id);
  if (index !== -1) {
    projects.splice(index, 1);
  }
}

function editProject(index, title) {
  projects[index].title = title;
}

function updateLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function findProject(id) {
  updateProjects();
  const index = projects.findIndex(current => current.id === id);
  return projects[index];
}

function validateInput(element) {
  if (element.value === '') {
    return false;
  }
  return true;
}

export {
  addProject, getProjectArr, updateProjects, deleteProject,
  editProject, updateLocalStorage, findProject, validateInput,
};