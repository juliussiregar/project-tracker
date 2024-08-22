class CreateTaskModal {
    constructor() {
        this.container = document.getElementById('createTaskModalContainer');
        this.nameInput = document.getElementById('createTaskNameInput');
        this.statusInput = document.getElementById('createTaskStatusInput');
        this.weightInput = document.getElementById('createTaskWeightInput');
        this.weightValue = document.getElementById('createTaskWeightValue');
        this.modalTitle = document.getElementById('createTaskModalTitle');
        this.projectSelect = document.getElementById('createTaskProjectSelect');
        this.currentProjectId = null;

        this.weightInput.addEventListener('input', () => {
            this.weightValue.textContent = this.weightInput.value;
        });

        this.populateProjectSelect = this.populateProjectSelect.bind(this);
    }

    static getInstance() {
        if (!CreateTaskModal.instance) {
            CreateTaskModal.instance = new CreateTaskModal();
        }
        return CreateTaskModal.instance;
    }

    open(projectId = null) {
        this.currentProjectId = projectId;

        this.modalTitle.innerText = 'Add Task';
        this.nameInput.value = '';
        this.statusInput.value = 'DRAFT';
        this.weightInput.value = 50;
        this.weightValue.textContent = this.weightInput.value;

        this.populateProjectSelect();

        this.container.classList.remove('hidden');
        this.container.classList.add('show');
    }

    close() {
        this.container.classList.remove('show');
        this.container.classList.add('hidden');
    }

    getTaskData() {
        return {
            name: this.nameInput.value,
            status: this.statusInput.value,
            weight: parseInt(this.weightInput.value),
            projectId: parseInt(this.projectSelect.value) || this.currentProjectId,
        };
    }

    populateProjectSelect() {
        const projects = window.projects || [];
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

    async saveTask() {
        const taskData = this.getTaskData();
    
        try {
            const response = await API.createTask(taskData.projectId, taskData);
    
            if (!response.ok) {
                const errorMessage = response.error || 'Failed to create task';
                throw new Error(errorMessage);
            }
    
            this.close();
            await TaskManager.loadTasks(taskData.projectId);
            const projectManager = new ProjectManager(new ProjectModal());
            projectManager.loadProjects(); 
            alert('Task created successfully');
    
        } catch (error) {
            const errorMessage = (() => {
                try {
                    return JSON.parse(error.message)?.error || error.message;
                } catch {
                    return error.message;
                }
            })();
            alert(`Failed to create task: ${errorMessage}`);
        }
    }
}
