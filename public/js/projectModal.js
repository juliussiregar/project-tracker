class ProjectModal {
  constructor() {
    this.container = document.getElementById('projectModalContainer');
    this.nameInput = document.getElementById('projectNameInput');
    this.modalTitle = document.getElementById('projectModalTitle');
    this.currentProjectId = null;
  }

  open(editing = false, project = null) {
    this.currentProjectId = editing && project ? project.id : null;

    this.modalTitle.innerText = editing ? 'Edit Project' : 'Add Project';
    this.nameInput.value = editing && project ? project.name : '';

    this.container.classList.remove('hidden');
  }

  close() {
    this.container.classList.add('hidden');
  }

  getProjectData() {
    return {
      name: this.nameInput.value,
    };
  }
}
