 // Variables to store task list and filter type

let tasks = [];
let filter = 'all';

// Function to render tasks based on the filter
function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  let filteredTasks = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item todo-item';
    listItem.innerText = task.description;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'mr-2';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', function () {
      task.completed = !task.completed;
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right';
    deleteButton.innerText = 'Delete';

    deleteButton.addEventListener('click', function () {
      tasks = tasks.filter(t => t !== task);
      renderTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const todoInput = document.getElementById('todo-input');
  const taskDescription = todoInput.value.trim();

  if (taskDescription === '') {
    return;
  }

  const newTask = {
    description: taskDescription,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
  todoInput.value = '';
}

// Function to handle filter change
function handleFilterChange(event) {
  filter = event.target.value;
  renderTasks();
}

// Add event listeners
const todoForm = document.getElementById('todo-form');
todoForm.addEventListener('submit', handleFormSubmit);

const filterSelect = document.getElementById('filter-select');
filterSelect.addEventListener('change', handleFilterChange);

// Initial rendering
renderTasks();