import getProjectsArr from '../index';
const projects = getProjectsArr();


function addProject(newProject) {
  console.log(projects);
  projects.push(newProject);

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
export {
  addProject, deleteProject, editProject, updateLocalStorage
};