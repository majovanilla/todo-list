
const projects = [];

function addProject(newProject) {
  projects.push(newProject);
}

function deleteProject(index) {
  projects.splice(index, 1);
}

function editProject(index, title) {
  projects[index].title = title;
}

export {
  addProject, projects, deleteProject, editProject,
};