function projectCtrl() {
  const project = (title) => {
    const todoList = [];

    const add = (todo) => {
      todoList.push(todo);
    };

    return { title, add, todoList };
  };
  project();
}

console.log(projectCtrl.project('this is the title'));

export { projectCtrl as default };