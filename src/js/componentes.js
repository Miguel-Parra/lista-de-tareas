import { Todo } from "../classes";
import { todoList } from "../index.js";

// Referencias en el HTMl
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {
	const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-identificador="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'completed' : ''}">
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;
	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);
	// divTodoList.innerHTML = htmlTodo;
	// return htmlTodo;
	return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {

	if (event.keyCode === 13 && txtInput.value.length != 0) {
		const nuevoTodo = new Todo(txtInput.value);
		txtInput.value = '';
		todoList.nuevoTodo(nuevoTodo);
		crearTodoHtml(nuevoTodo);
	}
})

divTodoList.addEventListener('click', (event) => {
	const nombreElemento = event.target.localName; //en este caso puede ser un input, label, button
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.dataset.identificador;
	// const todoId1 = todoElemento.getAttribute('data-identificador');
	// const todoId2 = todoElemento.getAttribute('class');

	if (nombreElemento.includes('input')) { // clic en el check
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle('completed')
	}
	if (nombreElemento.includes('button')) { //clic en el boton
		todoList.eliminarTodo(todoId);
		divTodoList.removeChild(todoElemento);
	}
})

btnBorrar.addEventListener('click', () => {
	todoList.eliminarCompletados();
	for (let i = divTodoList.children.length - 1; i >= 0; i--) {
		const elemento = divTodoList.children[i];
		if (elemento.classList.contains('completed')) {
			divTodoList.removeChild(elemento);
		}
	}
})

ulFiltros.addEventListener('click', (event) => {
	const filtro = event.target.text;
	if (!filtro) { return }; // si no hay nada entonces me haga el return
	anchorFiltros.forEach(elem => elem.classList.remove('selected'));
	event.target.classList.add('selected');
	for (const elemento of divTodoList.children) {
		console.log(elemento);
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');

		switch (filtro) {
			case 'Pendientes':
				if (completado) {
					elemento.classList.add('hidden');
				}
				break;
			case 'Completados':
				if (!completado) {
					elemento.classList.add('hidden');
				}
				break;
		}
	}
})