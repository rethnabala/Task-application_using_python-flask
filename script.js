const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fetch tasks from the backend
async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    renderTasks(tasks);
}

// Render tasks on the page
function renderTasks(tasks) {
    todoList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.description;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteTask(task.id);

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// Add a new task
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = input.value.trim();
    if (description) {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        });
        input.value = '';
        fetchTasks();
    }
});

// Delete a task
async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

// Initial fetch of tasks
fetchTasks();
