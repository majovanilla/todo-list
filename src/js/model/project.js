
const Project = (title, id = null, todoList = []) => ({ title, id, todoList });


let projects = [{ title: 'My project', id: 0, todoList: [] }];

function updateLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

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


function findProject(id) {
  updateProjects();
  const ids = projects.map(current => current.id);
  const index = ids.indexOf(parseInt(id, 10));
  return projects[index];
}


export { updateLocalStorage as default };