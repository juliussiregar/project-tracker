class EditTaskModal {
    constructor() {
        this.container = document.getElementById('editTaskModalContainer');
        this.nameInput = document.getElementById('editTaskNameInput');
        this.statusInput = document.getElementById('editTaskStatusInput');
        this.weightInput = document.getElementById('editTaskWeightInput');
        this.weightValue = document.getElementById('editTaskWeightValue');
        this.modalTitle = document.getElementById('editTaskModalTitle');
        this.projectSelect = document.getElementById('editTaskProjectSelect');
        this.currentTaskId = null;
        this.currentProjectId = null;

        if (this.weightInput) {
            this.weightInput.addEventListener('input', () => {
                this.weightValue.textContent = this.weightInput.value;
            });
        } else {
            console.error('editTaskWeightInput element not found');
        }

        if (this.projectSelect) {
            this.populateProjectSelect = this.populateProjectSelect.bind(this);
        } else {
            console.error('editTaskProjectSelect element not found');
        }
    }

    static getInstance() {
        if (!EditTaskModal.instance) {
            EditTaskModal.instance = new EditTaskModal();
        }
        return EditTaskModal.instance;
    }

    open(task, projectId) {
        this.currentTaskId = task.id;
        this.currentProjectId = projectId;

        if (this.modalTitle) this.modalTitle.innerText = 'Edit Task';
        if (this.nameInput) this.nameInput.value = task.name;
        if (this.statusInput) this.statusInput.value = task.status;
        if (this.weightInput) {
            this.weightInput.value = task.weight;
            this.weightValue.textContent = this.weightInput.value;
        }

        if (this.projectSelect) this.populateProjectSelect();

        if (this.container) {
            this.container.classList.remove('hidden');
            this.container.classList.add('show');
        }
    }

    close() {
        if (this.container) {
            this.container.classList.remove('show');
            this.container.classList.add('hidden');
        }
    }

    getTaskData() {
        return {
            name: this.nameInput ? this.nameInput.value : '',
            status: this.statusInput ? this.statusInput.value : 'DRAFT',
            weight: this.weightInput ? parseInt(this.weightInput.value) : 0,
            projectId: this.projectSelect ? parseInt(this.projectSelect.value) : this.currentProjectId,
            id: this.currentTaskId,
        };
    }

    populateProjectSelect() {
        const projects = window.projects || [];
        if (this.projectSelect) {
            this.projectSelect.innerHTML = '';
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.name;
                this.projectSelect.appendChild(option);
            });

            if (this.currentProjectId) {
                this.projectSelect.value = this.currentProjectId;
            }
        }
    }

    async saveTask() {
        const taskData = this.getTaskData();
    
        try {
            const response = await API.updateTask(this.currentTaskId, taskData);
    
            if (!response.ok) {
                const errorMessage = response.error || 'Failed to update task';
                throw new Error(errorMessage);
            }
    
            this.close();
            await TaskManager.loadTasks(taskData.projectId);
            const projectManager = new ProjectManager(new ProjectModal());
            projectManager.loadProjects(); 
            alert('Task updated successfully');
    
        } catch (error) {
            const errorMessage = (() => {
                try {
                    return JSON.parse(error.message)?.error || error.message;
                } catch {
                    return error.message;
                }
            })();
            alert(`Failed to update task: ${errorMessage}`);
        }
    }
}
