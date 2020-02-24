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

function updateCompletion(project) {
  if (project.todoList.length > 0) {
    const totalTodos = project.todoList.length;
    const arr = project.todoList.filter(ele => ele.status === true);
    const completed = arr.length;
    const percentage = ((completed * 100) / totalTodos).toFixed(0);
    return percentage;
  }
  return 0;
}

function getRedAlert(arr) {
  let count = 0;
  if (arr) {
    for (let i = 0; i < arr.length; i += 1) {
      const date = new Date(arr[i].due).setHours(0, 0, 0, 0);
      const todayDate = new Date().setHours(0, 0, 0, 0);
      if (todayDate >= date) {
        count += 1;
      }
    }
  }
  return count;
}

export {
  addProject, getProjectArr, updateProjects, deleteProject,
  editProject, updateLocalStorage, findProject, validateInput, updateCompletion, getRedAlert,
};