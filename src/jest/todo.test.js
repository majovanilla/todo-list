import todo from '../js/model/todo';

test('should have the correct parameters', () => {
  const element = todo('Title', 'description');
  expect(element).toMatchObject({
    title: expect.any(String),
    description: expect.any(String),
    priority: expect.any(String),
  });
});