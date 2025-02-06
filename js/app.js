let todos = [];

const todoItemsList = document.querySelector(".todo__items");
const addBtn = document.querySelector(".add-btn");
const todoTitleInput = document.querySelector("#todo-title");

addBtn.addEventListener("click", () => {
  const newTodo = createTodo();
  todos.push(newTodo);
  renderTodos();
});

function createTodo() {
  const todo = {
    id: Date.now(),
    title: todoTitleInput.value.trim(),
    createdAt: new Date().toLocaleDateString("fa-IR"),
    status: "uncompleted",
  };
  return todo;
}
function renderTodos() {
  todoItemsList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo__item");
    li.innerHTML = `<div class="todo__item__title">
    <span class="radio"><i class="fa-solid fa-check"></i></span>
        <p class="title">${todo.title}</p>
    </div>
    <div class="todo__item__actions">
        <button class="btn btn--primary">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn btn--secondary">
        <i class="fa-solid fa-trash-can"></i>
        </button>
    </div>`;
    const todoTitleBox = document.querySelector(".todo__item__title");
    todoTitleBox.addEventListener("click", () => console.log("box is clicked"));
    todoItemsList.append(li);
  });
}
