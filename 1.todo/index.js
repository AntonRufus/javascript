//Selectors -------------------------------------------------------
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Functions -------------------------------------------------------
// ADD TODO
const addTodo = (e) => {
  // prevent form from submitting
  e.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create li
  const newTodo = document.createElement("li");
  if (todoInput.value.length === 0) todoInput.value = "empty todo 🙂";
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // add todo to local storage
  saveLocalStorage(todoInput.value);
  // check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // append to list
  todoList.appendChild(todoDiv);
  // clear todo input value
  todoInput.value = "";
};

// DELETE TODO
const deleteCheck = (e) => {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    // remove local todos
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

// FILTER TODO
const filterTodo = (e) => {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      // show all todos
      case "all":
        todo.style.display = "flex";
        break;
      // show completed todos
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      // show uncompleted todos
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

// CHECK THE LOCAL STORAGE
const checkLocalStorage = () => {
  let todos;
  // ckeck the storage
  if (localStorage.getItem("todos") === null) {
    //  new empty array
    todos = [];
  } else {
    //  get back the actual array with todos
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

// SAVE THE LOCAL STORAGE
const saveLocalStorage = (todo) => {
  // ckeck the storage
  let todos = checkLocalStorage();
  // push a new todo
  todos.push(todo);
  // set it back itno a local storage
  localStorage.setItem("todos", JSON.stringify(todos));
};

// GET TODOS FROM THE LOCAL STORAGE
const getTodos = () => {
  // ckeck the storage
  let todos = checkLocalStorage();
  // loop over them
  todos.forEach(function (todo) {
    //  todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //  create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //  check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //  trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //  append to list
    todoList.appendChild(todoDiv);
  });
};

// REMOVE TODOS FROM THE LOCAL STORAGE
const removeLocalTodos = (todo) => {
  // ckeck the storage
  let todos = checkLocalStorage();
  // take the index of the clicked element
  const todoIndex = todo.children[0].textContent;
  // remove the clicked element from array
  todos.splice(todos.indexOf(todoIndex), 1);
  // update the array in local storage
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Event listeners -------------------------------------------------
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
