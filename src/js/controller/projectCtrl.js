let projects = [];

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
  newProject.id = projects.indexOf(newProject);
}

function deleteProject(index) {
  projects.splice(index, 1);
}

function editProject(index, title) {
  projects[index].title = title;
}

function updateLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function findProject(id) {
  return projects[id];
}

export {
  addProject, getProjectArr, updateProjects, deleteProject,
  editProject, updateLocalStorage, findProject,
};