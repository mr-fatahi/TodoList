let todos = [];
let filteredTodos = todos;
let id = 0;
let filter = "all";

const todoItemsList = document.querySelector(".todo__items");
const addBtn = document.querySelector(".add-btn");
const todoTitleInput = document.querySelector("#todo-title");
const completedNumber = document.querySelector(".completed-num");
const unCompletedNumber = document.querySelector(".uncompleted-num");
const selectFilter = document.querySelector("#select-filter");

addBtn.addEventListener("click", () => {
  if (todoTitleInput.value === "") {
    alert("مقدار خالی قابل ثبت در لیست نمی باشد");
  } else if (
    id === 0 &&
    todos.map((t) => t.title).includes(todoTitleInput.value)
  ) {
    alert("مقدار ورودی تکراری است");
  } else {
    createTodo(id);
  }
});
selectFilter.addEventListener("change", filterTodo);
function createTodo(id) {
  let todo;
  if (id === 0) {
    todo = {
      id: Date.now(),
      title: todoTitleInput.value.trim(),
      createdAt: new Date().toLocaleDateString("fa-IR"),
      isCompleted: false,
    };
    todos.push(todo);
  } else {
    todo = todos.find((t) => t.id === id);
    todo.title = todoTitleInput.value.trim();
  }
  renderTodos();
}
function renderTodos(_todos = todos) {
  todoItemsList.innerHTML = "";
  let result = "";
  _todos.forEach((todo) => {
    result += `<li class="todo__item">
    <div class="todo__item__title">
      <span class="radio ${
        todo.isCompleted ? "radio--checked" : ""
      }"><i data-todo-id=${
      todo.id
    } class="fa-solid fa-check radio-icon"></i></span>
      <p class="title ${todo.isCompleted ? "completed" : ""}">${todo.title}</p>
    </div>
    <div class="todo__item__actions">
      <button class="btn btn--primary">
        <i data-todo-id=${
          todo.id
        } class="fa-solid fa-pen-to-square edit-icon"></i>
      </button>
      <button class="btn btn--secondary">
        <i data-todo-id=${
          todo.id
        } class="fa-solid fa-trash-can remove-icon"></i>
      </button>
    </div>
    </li>`;
    todoItemsList.innerHTML = result;
    todoTitleInput.value = "";
    addBtn.textContent = "افزودن";
    id = 0;
  });
  const radioIcon = [...document.querySelectorAll(".radio-icon")];
  radioIcon.forEach((icon) => icon.addEventListener("click", checkTodo));
  const editIcons = [...document.querySelectorAll(".edit-icon")];
  editIcons.forEach((icon) => icon.addEventListener("click", editTodo));
  const removeIcons = [...document.querySelectorAll(".remove-icon")];
  removeIcons.forEach((icon) => icon.addEventListener("click", removeTodo));
  unCompletedNumber.textContent = _todos.filter(
    (todo) => !todo.isCompleted
  ).length;
  completedNumber.textContent = _todos.filter(
    (todo) => todo.isCompleted
  ).length;
}
function checkTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  renderTodos(filteredTodos);
}
function editTodo(e) {
  id = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === id);
  todoTitleInput.value = todo.title;
  addBtn.textContent = "ویرایش";
}
function removeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id !== todoId);
  renderTodos();
}
function filterTodo(e) {
  filter = e.target.value;
  switch (filter) {
    case "all":
      filteredTodos = todos;
      break;
    case "completed":
      filteredTodos = todos.filter((t) => t.isCompleted);
      break;
    case "uncompleted":
      filteredTodos = todos.filter((t) => !t.isCompleted);
      break;
    default:
      filteredTodos = todos;
  }
  renderTodos(filteredTodos);
}
