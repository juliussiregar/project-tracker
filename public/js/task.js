class TaskManager {
    static async loadTasks(projectId) {
        try {
            const tasksContainer = document.querySelector(`.tasks[data-project-id="${projectId}"]`);
            const response = await API.fetchTasksByProject(projectId);
    
            if (response.ok && Array.isArray(response.data)) {
                const tasks = response.data;
                tasksContainer.innerHTML = '';
                if (tasks.length === 0) {
                    tasksContainer.innerHTML = '<p class="text-gray-500">No tasks available.</p>';
                } else {
                    tasks.forEach(task => this.addTaskToDOM(task, tasksContainer));
                }
            } else {
                throw new Error('Failed to load tasks: Unexpected response structure');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    }
  
    static addTaskToDOM(task, tasksContainer) {
        const taskEl = document.createElement('div');
        taskEl.classList.add('p-2', 'bg-gray-100', 'rounded', 'shadow');
        taskEl.innerHTML = `
            <p>${task.name} - ${task.status} (Weight: ${task.weight})</p>
            <button class="bg-yellow-500 text-white px-2 py-1 rounded mt-2 editTaskBtn">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded mt-2 deleteTaskBtn">Delete</button>
        `;
  
        taskEl.querySelector('.editTaskBtn').addEventListener('click', () => this.editTask(task));
        taskEl.querySelector('.deleteTaskBtn').addEventListener('click', () => this.deleteTask(task.id, taskEl));
  
        tasksContainer.appendChild(taskEl);
    }
  
    static editTask(task) {
        const modal = EditTaskModal.getInstance();
        modal.open(task, task.projectId);
    }
  
    static createTask(projectId) {
        const modal = CreateTaskModal.getInstance();
        modal.open(projectId);
    }
  
    static deleteTask(taskId, taskEl) {
        API.deleteTask(taskId)
            .then(() => {
                taskEl.remove();
                const projectManager = new ProjectManager(new ProjectModal());
            projectManager.loadProjects(); 
                alert('Task deleted successfully');
            })
            .catch(error => {
                const errorMessage = (() => {
                    try {
                        return JSON.parse(error.message)?.error || error.message;
                    } catch {
                        return error.message;
                    }
                })();
    
                alert(`Failed to delete task: ${errorMessage}`);
            });
    }
}
