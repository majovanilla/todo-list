function projectView() {

  const renderProject = (info) => {
    const section = document.querySelector('.project-section');
    const project = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = info;
    project.append(title);
    section.append(project);
  };
}

export { projectView as default };