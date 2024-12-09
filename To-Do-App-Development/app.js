const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskText = taskInput.value.trim();
    const taskPriority = prioritySelect.value;
    
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerText = `${taskText} (Priority: ${taskPriority})`;
        li.dataset.priority = taskPriority;
        li.dataset.status = 'Pending';

        const editButton = createButton('Edit', () => editTask(li));
        const deleteButton = createButton('Delete', () => deleteTask(li));
        const statusButton = createButton('Mark as Completed', () => toggleStatus(li));

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(statusButton);

        taskList.appendChild(li);
        taskInput.value = '';

        // Save tasks to local storage
        saveTasks();
    }
}

function editTask(taskElement) {
    const newText = prompt('Edit task:', taskElement.innerText.split(' (')[0]);
    if (newText !== null) {
        taskElement.innerText = `${newText} (Priority: ${taskElement.dataset.priority})`;
        saveTasks();
    }
}

function deleteTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

function toggleStatus(taskElement) {
    if (taskElement.dataset.status === 'Pending') {
        taskElement.dataset.status = 'Completed';
        taskElement.classList.add('completed');
    } else {
        taskElement.dataset.status = 'Pending';
        taskElement.classList.remove('completed');
    }
    saveTasks();
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', onClick);
    return button;
}

function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll('#task-list li');
    
    taskElements.forEach(taskElement => {
        const task = {
            text: taskElement.innerText.split(' (')[0],
            priority: taskElement.dataset.priority,
            status: taskElement.dataset.status,
        };
        tasks.push(task);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerText = `${task.text} (Priority: ${task.priority})`;
            li.dataset.priority = task.priority;
            li.dataset.status = task.status;

            const editButton = createButton('Edit', () => editTask(li));
            const deleteButton = createButton('Delete', () => deleteTask(li));
            const statusButton = createButton('Mark as Completed', () => toggleStatus(li));

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            li.appendChild(statusButton);

            if (task.status === 'Completed') {
                li.classList.add('completed');
            }

            taskList.appendChild(li);
        });
    }
}