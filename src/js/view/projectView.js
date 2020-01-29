
export default function renderProject(projectTitle) {
  const section = document.querySelector('.project-section');
  const project = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = projectTitle;
  project.append(title);
  section.append(project);
}
const projectsArr = JSON.parse(localStorage.getItem('projects'));
