const projectController = () => {
  const addNewProject = (e) => {
    if (e.key === 'Enter') {
      const projectTitle = dom.newProject;
      if (validateInput(projectTitle)) {
        createProject(projectTitle.value);
      }
    }
  };

  function createProject(title) {
    const ID = generateID(getProjectArr());
    const p = Project(title, ID);
    addProject(p);
    updateLocalStorage();
    renderProject();
    clearInput(dom.newProject);
  }

  const projectClick = (projectId) => {
    const project = findProject(projectId);
    clearTodo();
    selectedProject(projectId);
    renderTodoSection();
    renderTodoList(project);
  };

  const projectDelete = (id) => {
    const ID = parseInt(id, 10);
    deleteProject(ID);
    updateLocalStorage();
    renderProject();
  };

  updateLocalStorage();
};

export { projectController as default };