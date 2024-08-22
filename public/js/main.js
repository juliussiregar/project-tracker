document.addEventListener('DOMContentLoaded', function () {
    const projectModal = new ProjectModal();
    const createTaskModal = CreateTaskModal.getInstance();
    const editTaskModal = EditTaskModal.getInstance();
    const projectManager = new ProjectManager(projectModal);

    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            projectModal.open(false, null);
        });
    } else {
        console.error('Element addProjectBtn not found');
    }

    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            createTaskModal.open(null); 
        });
    } else {
        console.error('Element addTaskBtn not found');
    }

    const saveProjectBtn = document.getElementById('saveProjectBtn');
    if (saveProjectBtn) {
        saveProjectBtn.addEventListener('click', () => {
            projectManager.saveProject();
        });
    } else {
        console.error('Element saveProjectBtn not found');
    }

    const saveCreateTaskBtn = document.getElementById('saveCreateTaskBtn');
    if (saveCreateTaskBtn) {
        saveCreateTaskBtn.addEventListener('click', () => {
            createTaskModal.saveTask();
        });
    } else {
        console.error('Element saveCreateTaskBtn not found');
    }

    const saveEditTaskBtn = document.getElementById('saveEditTaskBtn');
    if (saveEditTaskBtn) {
        saveEditTaskBtn.addEventListener('click', () => {
            editTaskModal.saveTask();
        });
    } else {
        console.error('Element saveEditTaskBtn not found');
    }

    // Close modal
    const cancelProjectBtn = document.getElementById('cancelProjectBtn');
    if (cancelProjectBtn) {
        cancelProjectBtn.addEventListener('click', () => projectModal.close());
    } else {
        console.error('Element cancelProjectBtn not found');
    }

    const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
    if (closeProjectModalBtn) {
        closeProjectModalBtn.addEventListener('click', () => projectModal.close());
    } else {
        console.error('Element closeProjectModalBtn not found');
    }

    // Close create task modal
    const cancelCreateTaskBtn = document.getElementById('cancelCreateTaskBtn');
    if (cancelCreateTaskBtn) {
        cancelCreateTaskBtn.addEventListener('click', () => createTaskModal.close());
    } else {
        console.error('Element cancelCreateTaskBtn not found');
    }

    const closeCreateTaskModalBtn = document.getElementById('closeCreateTaskModalBtn');
    if (closeCreateTaskModalBtn) {
        closeCreateTaskModalBtn.addEventListener('click', () => createTaskModal.close());
    } else {
        console.error('Element closeCreateTaskModalBtn not found');
    }

    // Close edit task modal
    const cancelEditTaskBtn = document.getElementById('cancelEditTaskBtn');
    if (cancelEditTaskBtn) {
        cancelEditTaskBtn.addEventListener('click', () => editTaskModal.close());
    } else {
        console.error('Element cancelEditTaskBtn not found');
    }

    const closeEditTaskModalBtn = document.getElementById('closeEditTaskModalBtn');
    if (closeEditTaskModalBtn) {
        closeEditTaskModalBtn.addEventListener('click', () => editTaskModal.close());
    } else {
        console.error('Element closeEditTaskModalBtn not found');
    }

    projectManager.loadProjects();
});
