let tasks = [];

function updateTime() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = document.getElementById("time");

    const minutes = `${25 - Math.ceil(res.timer / 60)}`.padStart(2, "0");
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
  });
}
updateTime();
setInterval(updateTime, 1000);
const startTimerButton = document.getElementById("start-timer-button");
startTimerButton.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerButton.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const resetTimerButton = document.getElementById("reset-timer-button");
resetTimerButton.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerButton.textContent = "Start Timer";
    }
  );
});
const addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", () => addTask());
chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});
function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task ...";
  text.value = tasks[taskNum];

  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
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
  saveTasks();
}
function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}
function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
