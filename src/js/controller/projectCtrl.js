let projects = [];

function updateProjects() {
  const localStorageArr = JSON.parse(localStorage.getItem('projects'));
  if (localStorageArr) {
    projects = [...localStorageArr];
  }
}

function generateID(array) {
  let ID;
  if (array.length > 0) {
    ID = array[array.length - 1].id + 1;
  } else if (array.length === 0) {
    ID = 0;
  }
  return ID;
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
  return projects[id];
}

export {
  addProject, getProjectArr, generateID, updateProjects, deleteProject,
  editProject, updateLocalStorage, findProject,
};