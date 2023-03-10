// These <..> are types which are in TypeScript to specify the type.
// for others you might have to use `as <Type>`
const todoList = document.querySelector<HTMLUListElement>('.todo-list');
const form = document.querySelector<HTMLFormElement>('.input-form');
const input = document.querySelector<HTMLInputElement>('.todo-input');
const tasks: Task[] = loadTodos();

tasks.forEach(addListItems)
// Known as custom data type, should be used when we're using the same data type alot
type Task = {
    // id: string,
    title: string,
    completed: boolean,
    createdAt: Date
} 
//did optional chaining so that it terminates the function
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(todoList);
    if (input?.value == "" || input?.value == null) return;

    const newTask: Task = {
        //* id: ADD THE UUID V4() THINGY LATER ON 
        // Will have to use @types/uuid
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask);
    saveTodos()
    
    addListItems(newTask)
    input.value = "";
});


function addListItems(tasks: Task) {
    
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', () => {
        tasks.completed = checkbox.checked;
        console.log(tasks);
    })   
    checkbox.setAttribute('type', 'checkbox');
    checkbox.type = 'checkbox';
    checkbox.checked = tasks.completed;
    label.append(checkbox, tasks.title)
    item.append(label);
    todoList?.append(item);
}

function saveTodos() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}

//Checking for if todos are null and returning []
function loadTodos(): Task[] {
    const taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null) return []; 
    return JSON.parse(taskJSON);
}

