const origin = window.location.origin;
const socket = io(origin);
const EVENT_TYPE = {
  CREATE: 'create',
  DELETE: 'delete',
  UPDATE: 'update',
};

socket.on('newTask', function (task) {
  switch (true) {
    case task.task.method === EVENT_TYPE.CREATE:
      createNewRow(task);
      break;
    case task.task.method === EVENT_TYPE.UPDATE:
      updateRow(task);
      break;
    case task.task.method === EVENT_TYPE.DELETE:
      deleteRow(task);
      break;
  }
});

socket.on('connect', function () {
  console.log('Connected to WebSocket server');
  showAlert('Connected to WebSocket server', 'success');
});

socket.on('disconnect', function () {
  console.log('Disconnected from WebSocket server');
  showAlert('Disconnected from WebSocket server', 'danger');
});

function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function createNewRow(task) {
  const taskList = document.getElementById('tasks');
  const taskRow = document.createElement('tr');

  taskRow.innerHTML = `
            <td>${task.task.id}</td>
            <td>${task.task.title}</td>
            <td>${task.task.description}</td>
            <td>${task.task.status}</td>
            <td>${task.task.assignee}</td>
          `;
  taskRow.setAttribute('id', task.task.id);
  taskList.appendChild(taskRow);

  showAlert(task.message);
}
function updateRow(task) {
  let taskRow = document.getElementById(`${task.task.id}`);
  if (taskRow) {
    taskRow.innerHTML = `
            <td>${task.task.id}</td>
            <td>${task.task.title}</td>
            <td>${task.task.description}</td>
            <td>${task.task.status}</td>
            <td>${task.task.assignee}</td>
          `;
  } else {
    const taskList = document.getElementById('tasks');
    taskRow = document.createElement('tr');
    taskRow.innerHTML = `
            <td>${task.task.id}</td>
            <td>${task.task.title}</td>
            <td>${task.task.description}</td>
            <td>${task.task.status}</td>
            <td>${task.task.assignee}</td>
          `;

    taskList.appendChild(taskRow);
  }

  showAlert(task.message);
}
function deleteRow(task) {
  const taskList = document.getElementById('tasks');
  const taskRow = document.getElementById(`${task.task.id}`);

  if (taskRow) {
    taskList.removeChild(taskRow);
  }

  showAlert(task.message);
}
