import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        // this.todos = []
        this.cargarLocalStorage()
    }
    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();

    }
    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== Number(id));
        this.guardarLocalStorage();
    }
    marcarCompletado(id) {
        for (const todo of this.todos) {
            // console.log(id, todo.id);
            if (todo.id === Number(id)) {
                todo.completado = !todo.completado; // ! significa negación
                this.guardarLocalStorage();
                break; // salimos del ciclo ya que no debe haber más de un id igual
            }
        }
    }
    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado)
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));

    }
    cargarLocalStorage() {
        this.todos = localStorage.getItem('todos')
        ?JSON.parse(localStorage.getItem('todos'))
        :[];
    //    this.todos = this.todos.map(obj => Todo.transformarInstancia(obj))
       this.todos = this.todos.map(Todo.transformarInstancia)
    }

}