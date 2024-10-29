// script.js

let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const taskDateTime = document.getElementById("taskDateTime").value;

    if (taskInput === "") return alert("Please enter a task.");

    const task = {
        id: Date.now(),
        text: taskInput,
        dateTime: taskDateTime,
        completed: false
    };
    tasks.push(task);
    document.getElementById("taskInput").value = ""; // Clear input
    document.getElementById("taskDateTime").value = ""; // Clear date & time
    renderTasks();
}

// Function to render tasks to the DOM
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";

        const taskDetails = document.createElement("div");
        taskDetails.className = "task-details";
        
        const taskText = document.createElement("span");
        taskText.className = `task-text ${task.completed ? "completed" : ""}`;
        taskText.textContent = task.text;
        taskText.onclick = () => toggleComplete(task.id);
        
        const taskDate = document.createElement("small");
        taskDate.textContent = task.dateTime ? `Due: ${new Date(task.dateTime).toLocaleString()}` : "";

        taskDetails.appendChild(taskText);
        taskDetails.appendChild(taskDate);

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(task.id);

        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(taskActions);
        taskList.appendChild(taskItem);
    });
}

// Function to toggle task completion
function toggleComplete(taskId) {
    tasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Function to edit a task
function editTask(taskId) {
    const newTaskText = prompt("Edit your task:");
    if (newTaskText === null) return; // Cancel edit

    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, text: newTaskText.trim() || task.text } : task
    );
    renderTasks();
}
