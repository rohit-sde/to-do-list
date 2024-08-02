const form = document.getElementById("todoForm");
const newTodoInput = document.getElementById("newTodoInput");
const todosList = document.getElementById("todosList");

// Define hex characters for color generation
const hexCharacters = "0123456789ABCDEF";

let todos = [];
let EditTodoId = -1;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  submitTodo();
  renderTodos();
});

function submitTodo() {
  const todoValue = newTodoInput.value;
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
    if (EditTodoId >= 0) {
      todos = todos.map((todo, index) => ({
        ...todos,
        value: index === EditTodoId ? todoValue : todo.value,
      }));
      EditTodoId = -1;
    } else {
      // Generate a random hex color code
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color +=
          hexCharacters[Math.floor(Math.random() * hexCharacters.length)];
      }
      // console.log(todo);

      todos.push({
        value: todoValue,
        checked: false,
        color: color,
      });
      // console.log(todos);
    }

    // Clear the input field after adding the todo
    newTodoInput.value = "";
  }
}

function renderTodos(order) {
  todosList.innerHTML = "";
  todos.forEach((todo, index) => {
    todosList.innerHTML += `<div class="todos" id=${index}>
      <i
      class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"}"
      style="color: ${todo.color}" data-action='check'>(checked)</i>
      <p class="todoText">${todo.value}</p>
      <i class="bi bi-pencil-square" id="editTodo" data-action='edit'>(edit) </i>
      <i class="bi bi-trash3" id="trashTodo" data-action='delete'>(trash)</i>
      </div>`;
  });
}

// click event listner for all the todo

todosList.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;
  if (parentElement.className !== "todos") return;
  //todo id
  const todo = parentElement;
  const todoId = Number(todo.id);
  // target action
  const action = target.dataset.action;

  action === "check" && checkTodo(todoId);
  action === "edit" && editTodo(todoId);
  action === "delete" && deleteTodo(todoId);
  // console.log(todoId);
});

// Check A Todo

function checkTodo(todoId) {
  console.log(todos);
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  console.log(todos);

  renderTodos();
}

// Edit a todo

function editTodo(todoId) {
  // console.log(todos[todoId].value);
  newTodoInput.value = todos[todoId].value;
  // console.log(newTodoInput.values);
  EditTodoId = todoId;
}
