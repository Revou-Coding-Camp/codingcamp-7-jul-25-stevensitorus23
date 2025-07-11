const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

let todos = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === '' || date === '') {
    alert("Please fill in both fields.");
    return;
  }

  todos.push({ task, date, done: false });
  taskInput.value = '';
  dateInput.value = '';

  showTasks();
});

function showTasks() {
  taskList.innerHTML = '';

  if (todos.length === 0) {
    taskList.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? 'Done' : 'Pending'}</td>
      <td>
        <button onclick="toggle(${index})">Check</button>
        <button onclick="remove(${index})">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

function toggle(index) {
  todos[index].done = !todos[index].done;
  showTasks();
}

function remove(index) {
  todos.splice(index, 1);
  showTasks();
}

clearBtn.addEventListener('click', function() {
  if (confirm("Delete all tasks?")) {
    todos = [];
    showTasks();
  }
});

// Initial call
showTasks();