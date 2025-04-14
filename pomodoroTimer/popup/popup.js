const tasks = [];

const addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", () => addTask());

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task ...";

  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
  });
  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "X";
  deleteButton.addEventListener("click", () => {
    tasks.splice(taskNum, 1);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteButton);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}
