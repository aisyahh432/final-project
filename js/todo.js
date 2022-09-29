//select all
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items");

//hold all our todo items
let todos = [];

//menambahkan eventListener pada form 
todoForm.addEventListener("submit", function (event) {
//mencegah halaman memuat ulang saat mengirimkan form
  event.preventDefault();
  addTodo(todoInput.value);
});

// function tambah: jika itemnya tidak kosong, maka akan di buatkan
// todo object yg mempunyai id, name dan completed properties
function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = "";
  }
}

//RenderTodos
function renderTodos(todos) {
  todoItemsList.innerHTML = "";
//mengulang setiap object didalam array todos
  todos.forEach(function (item) {
    const checked = item.completed ? "checked" : null;
//disetiap item akan membuat tag li
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
//jika item selesai maka akan ditambahkan ke dalam kelas checked
    if (item.completed === true) {
      li.classList.add("checked");
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    todoItemsList.append(li);
  });
}

//Function addtoLocalStorage
//function untuk menambahkan item kedalam local storage
function addToLocalStorage(todos) {
//convert array menjadi string menggunakan stringify
  localStorage.setItem("todos", JSON.stringify(todos));
//merender untuk di tampilkan dengan memanggil function renderTodos
//setiap kali kita menambahkan sesuatu ke localstorage, kita harus merender perubahan itu ke layar
  renderTodos(todos);
}

//Function getFromLocalStorage
//function ini berfungsi untuk membantu kita untuk parse item dari local storage setiap kali halaman di refresh
function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");
//jika reference ada maka akan di kembalikan kedalam bentuk array
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}
getFromLocalStorage();

//function toggle
//mengecek apakah sudah completed atau belum completed
function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  //update to localstorage
  addToLocalStorage(todos);
}

//function deleteTodo
//menghapus todos dari todos array kemudian di update ke localstorage
function deleteTodo(id) {
//mengfilter tag li dan memperbarui dalam todos array
  todos = todos.filter(function (item) {
    return item.id != id;
  });
//update to localstorage
  addToLocalStorage(todos);
}

todoItemsList.addEventListener("click", function (event) {
//jika user menekan button checkbox maka akan di panggil function toggle
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }
//jika user menekan button delete maka akan memanggil function delete-
  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});
