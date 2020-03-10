function getProjects() {
  return JSON.parse(localStorage.getItem('projects'));
}

function updateLocalStorage(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function initialProject() {
  const projects = getProjects();
  if (!projects || projects.length === 0) {
    const initial = [{ title: 'New project', id: 0, todoList: [] }];
    updateLocalStorage(initial);
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

// function getProjectArr() {
//   return projects;
// }

function addProject(newProject) {
  const projects = getProjects();
  projects.push(newProject);
  updateLocalStorage(projects);
}

function deleteProject(id) {
  const projects = getProjects();
  const ids = projects.map(current => current.id);

  const index = ids.indexOf(id);
  if (index !== -1) {
    projects.splice(index, 1);
  }
  updateLocalStorage(projects);
}

function editProject(index, title) {
  const projects = getProjects();
  projects[index].title = title;
  updateLocalStorage(projects);
}

function findProject(id) {
  const projects = getProjects();
  const ids = projects.map(current => current.id);
  const index = ids.indexOf(parseInt(id, 10));
  return projects[index];
}

function validateInput(element) {
  if (element.value === '') {
    return false;
  }
  return true;
}

// updateLocalStorage();

export {
  initialProject, addProject, generateID, getProjects, deleteProject,
  editProject, updateLocalStorage, findProject, validateInput,
};