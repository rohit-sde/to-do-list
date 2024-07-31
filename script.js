const form = document.getElementById("todoForm");
const newTodo = document.getElementById("newTodo");

// Define hex characters for color generation
const hexCharacters = "0123456789ABCDEF";

let todos = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  submitTodo();
});

function submitTodo() {
  const todoValue = newTodo.value;
  // checking todoValue is empty or not
  const emptyTodo = todoValue === "";

  if (emptyTodo) {
    alert("--- Do not you are able to submit empty input ---");
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
