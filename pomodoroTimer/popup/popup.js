const tasks = [];

const addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", () => addTask());

function renderTask(taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task ...";
  text.value = tasks[taskNum];

  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
  });
  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "X";
  deleteButton.addEventListener("click", () => {
    deleteTask(taskNum);
  });
  taskRow.appendChild(text);
  taskRow.appendChild(deleteButton);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
}
function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
}
function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
