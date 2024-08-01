const form = document.getElementById("todoForm");
const newTodo = document.getElementById("newTodo");
const todosList = document.getElementById("todosList");

// Define hex characters for color generation
const hexCharacters = "0123456789ABCDEF";

let todos = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  submitTodo();
  renderTodos();
});

function submitTodo() {
  const todoValue = newTodo.value;
  // checking todoValue is empty or not
  const emptyTodo = todoValue === "";
  // for checking todo is same or not
  const isDuplicate = todos.some(
    (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
  );

  if (emptyTodo) {
    alert("--- Do not you are able to submit empty input ---");
  } else if (isDuplicate) {
    alert("--- This Todo is already excited ---");
  } else {
    // Generate a random hex color code
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
    }

    const todo = {
      value: todoValue,
      checked: false,
      color: color,
    };
    console.log(todo);

    todos.push(todo);
    console.log(todos);

    // Clear the input field after adding the todo
    newTodo.value = "";
  }
}

function renderTodos() {
  // console.log(todos);
  // console.log(todosList);
  todosList.innerHTML = "";

  todos.forEach((todo, index) => {
    todosList.innerHTML += `<div class="todos" id=${index}>
          <i
           class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"}"
           style="color: ${todo.color}">(checked)</i>
          <p class="todoText">${todo.value}</p>
          <i class="bi bi-pencil-square" id="editTodo">(edit) </i>
          <i class="bi bi-trash3" id="trashTodo">(trash)</i>
        </div>`;
  });
}

// click event listner for all the todo

todosList.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;
  if (parentElement.className !== "todos") return;

  const todo = parentElement;
  const todoId = Number(todo.id);

  console.log(todoId);
});
