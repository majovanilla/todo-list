export default function renderProject() {
  const projectsArr = JSON.parse(localStorage.getItem('projects'));
  const section = document.querySelector('.project-section');
  section.classList.add('row');

  if (projectsArr !== null) {
    projectsArr.forEach((project) => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project', 'col-12');
      const h2 = document.createElement('h2');
      h2.classList.add('project-title');
      h2.textContent = project.title;
      projectDiv.append(h2);
      section.append(projectDiv);
    });
  }
}
