import { addTodo, deleteTodo } from '../js/controller/todoListCtrl';
import todo from '../js/model/todo';

describe('todo controller', () => {
  const projectArr = [{
    title: 'Project 1',
    id: 0,
    todoList: [
      { title: 'todo 1', description: 'some text' },
      { title: 'todo 2', description: 'some text' },
    ],
  },
  {
    title: 'Project 2',
    id: 1,
    todoList: [
      { title: 'todo 1', description: 'some text' },
      { title: 'todo 2', description: 'some text' },
    ],
  }];

  const dodo = todo('todo 3');

  test('adds a todo to the projects array', () => {
    addTodo(projectArr, 0, dodo);
    expect(projectArr[0].todoList.length).toEqual(3);
  });

  test('deletes a todo from a project', () => {
    deleteTodo(projectArr[0], 0);
    expect(projectArr[0].todoList.length).toEqual(2);
  });
});
