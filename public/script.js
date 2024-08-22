document.addEventListener('DOMContentLoaded', function () {
    const projectModal = document.getElementById('projectModal');
    const projectNameInput = document.getElementById('projectName');
    const projectStatusInput = document.getElementById('projectStatus');
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const createProjectBtn = document.getElementById('createProjectBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let editingProjectId = null;
  
    function openModal(editing = false) {
      projectModal.classList.remove('hidden');
      if (editing) {
        document.getElementById('modalTitle').innerText = 'Edit Project';
      } else {
        document.getElementById('modalTitle').innerText = 'Create Project';
        projectNameInput.value = '';
        projectStatusInput.value = 'DRAFT';
        editingProjectId = null;
      }
    }
  
    function closeModal() {
      projectModal.classList.add('hidden');
    }
  
    function fetchProjects() {
      fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then(data => {
          const projectsContainer = document.getElementById('projects');
          projectsContainer.innerHTML = '';
          data.forEach(project => {
            const projectEl = document.createElement('div');
            projectEl.classList.add('p-4', 'bg-white', 'rounded', 'shadow');
            projectEl.innerHTML = `
              <h3 class="text-xl font-semibold">${project.name}</h3>
              <p>Status: ${project.status}</p>
              <p>Progress: ${project.progress}%</p>
              <button class="bg-yellow-500 text-white px-2 py-1 rounded mt-2 editBtn">Edit</button>
              <button class="bg-red-500 text-white px-2 py-1 rounded mt-2 deleteBtn">Delete</button>
            `;
            projectEl.querySelector('.editBtn').addEventListener('click', () => openModalForEdit(project));
            projectEl.querySelector('.deleteBtn').addEventListener('click', () => deleteProject(project.id));
            projectsContainer.appendChild(projectEl);
          });
        })
        .catch(error => console.error('Error fetching projects:', error));
    }
  
    function openModalForEdit(project) {
      openModal(true);
      projectNameInput.value = project.name;
      projectStatusInput.value = project.status;
      editingProjectId = project.id;
    }
  
    function saveProject() {
      const projectData = {
        name: projectNameInput.value,
        status: projectStatusInput.value
      };
  
      const url = editingProjectId
        ? `http://localhost:3000/api/projects/${editingProjectId}`
        : 'http://localhost:3000/api/projects';
  
      const method = editingProjectId ? 'PUT' : 'POST';
  
      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })
        .then(response => response.json())
        .then(data => {
          closeModal();
          fetchProjects();
        })
        .catch(error => console.error('Error saving project:', error));
    }
  
    function deleteProject(projectId) {
      fetch(`http://localhost:3000/api/projects/${projectId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          fetchProjects();
        })
        .catch(error => console.error('Error deleting project:', error));
    }
  
    createProjectBtn.addEventListener('click', () => openModal());
    saveProjectBtn.addEventListener('click', saveProject);
    cancelBtn.addEventListener('click', closeModal);
  
    fetchProjects();
  });
  