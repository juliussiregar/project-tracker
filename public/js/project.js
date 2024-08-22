class ProjectManager {
    constructor(modal) {
      this.modal = modal;
      this.projectsContainer = document.getElementById('projects');
      this.editingProjectId = null;
      this.currentProjectEl = null;
    }
  
    loadProjects() {
      API.fetchProjects()
        .then(data => {
          this.projectsContainer.innerHTML = '';
          window.projects = data; 
          data.forEach(project => this.addProjectToDOM(project));
        })
        .catch(error => console.error('Error fetching projects:', error));
    }
  
    addProjectToDOM(project) {
      const projectEl = document.createElement('div');
      projectEl.classList.add('p-4', 'bg-white', 'rounded', 'shadow', 'mb-4');
      projectEl.innerHTML = `
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">${project.name}</h3>
          <div>
            <button class="bg-yellow-500 text-white px-2 py-1 rounded editBtn">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded deleteBtn" data-project-id="${project.id}">Delete</button>
          </div>
        </div>
        <p>Status: ${project.status}</p>
        <p>Progress: ${project.progress.toFixed(2)}%</p>
        <div class="tasks space-y-2 mt-4" data-project-id="${project.id}"></div> <!-- Task container -->
      `;
  
      projectEl.querySelector('.editBtn').addEventListener('click', () => this.editProject(project, projectEl));
      projectEl.querySelector('.deleteBtn').addEventListener('click', () => this.confirmDelete(project.id));
  
      this.projectsContainer.appendChild(projectEl);
  
      const tasksContainer = projectEl.querySelector('.tasks');
      TaskManager.loadTasks(project.id, tasksContainer);
    }
  
    editProject(project, projectEl) {
      this.editingProjectId = project.id;
      this.currentProjectEl = projectEl;
      this.modal.open(true, project);
    }
  
    saveProject() {
      const projectData = this.modal.getProjectData();
  
      if (this.editingProjectId) {
        API.updateProject(this.editingProjectId, projectData)
          .then(updatedProject => {
            if (this.currentProjectEl) {
              const projectNameEl = this.currentProjectEl.querySelector('h3');
              const projectStatusEl = this.currentProjectEl.querySelector('p:nth-child(3)');
              const projectProgressEl = this.currentProjectEl.querySelector('p:nth-child(4)');
  
              if (projectNameEl) projectNameEl.textContent = updatedProject.name;
              if (projectStatusEl) projectStatusEl.textContent = `Status: ${updatedProject.status}`;
              if (projectProgressEl) projectProgressEl.textContent = `Progress: ${updatedProject.progress.toFixed(2)}%`;
            } else {
              this.loadProjects();
            }
            alert('Project updated successfully');
            this.modal.close();
          })
          .catch(error => {
            console.error('Error updating project:', error);
            alert('Failed to update project');
          });
      } else {
        this.createProject();
      }
    }
  
    createProject() {
      const projectData = this.modal.getProjectData();
      API.createProject(projectData)
        .then(() => {
          this.modal.close();
          this.loadProjects();
          alert('Project created successfully');
        })
        .catch(error => {
          console.error('Error creating project:', error);
          alert('Failed to create project');
        });
    }
  
    confirmDelete(projectId) {
      const confirmation = window.confirm('Are you sure you want to delete this project?');
      if (confirmation) {
        this.deleteProject(projectId);
      }
    }
  
    deleteProject(projectId) {
      API.deleteProject(projectId)
        .then(() => {
          const projectEl = document.querySelector(`.deleteBtn[data-project-id="${projectId}"]`).closest('div.p-4');
          if (projectEl) {
            projectEl.remove();
          }
          alert('Project deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting project:', error);
          alert('Failed to delete project');
        });
    }
  }
  