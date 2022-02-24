import './styles.css'

import { Todo, TodoList } from './classes';
import { crearTodoHtml, colocarPendientesHtml } from './js/componentes';

export const todoList = new TodoList();

// for (let todo of todoList.todos) {
//     crearTodoHtml(todo);
// }
// todoList.todos.forEach(todo => crearTodoHtml(todo));
todoList.todos.forEach(crearTodoHtml);
colocarPendientesHtml();



console.log('todos', todoList);






