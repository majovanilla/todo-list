
const projects = [];

function addProject(newProject) {
  projects.push(newProject);
  updateLocalStorage();
}

function deleteProject(index) {
  projects.splice(index, 1);
  updateLocalStorage();
}

function editProject(index, title) {
  projects[index].title = title;
  updateLocalStorage();
}

export { addProject, projects, deleteProject, editProject };