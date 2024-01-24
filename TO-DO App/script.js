document.addEventListener("DOMContentLoaded", function() {
    // Check for existing tasks in localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Render existing tasks
    renderTasks();

    // Function to add a new task
    window.addTask = function() {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = "";
        }
    };

    // Function to render tasks
    function renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(function(task, index) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="removeTask(${index})">Remove</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Function to toggle task completion
    window.toggleComplete = function(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    // Function to remove a task
    window.removeTask = function(index) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };
});
