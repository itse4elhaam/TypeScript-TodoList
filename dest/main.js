"use strict";
// These <..> are types which are in TypeScript to specify the type.
// for others you might have to use `as <Type>`
const todoList = document.querySelector('.todo-list');
const form = document.querySelector('.input-form');
const input = document.querySelector('.todo-input');
const tasks = [];
tasks.forEach(addListItems);
//did optional chaining so that it terminates the function
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(todoList);
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        //* id: ADD THE UUID V4() THINGY LATER ON 
        // Will have to use @types/uuid
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    input.value = "";
    tasks.push(newTask);
    addListItems(newTask);
});
function addListItems(tasks) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', () => {
        tasks.completed = checkbox.checked;
        console.log(tasks);
    });
    checkbox.setAttribute('type', 'checkbox');
    checkbox.type = 'checkbox';
    checkbox.checked = tasks.completed;
    label.append(checkbox, tasks.title);
    item.append(label);
    todoList === null || todoList === void 0 ? void 0 : todoList.append(item);
}
function saveTodos() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Checking for if todos are null and returning []
function loadTodos() {
    const taskJSON = localStorage.getItem('tasks');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
