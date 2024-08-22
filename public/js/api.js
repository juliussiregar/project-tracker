class API {
    static fetchProjects() {
      return fetch('http://localhost:3000/api/projects')
        .then(response => response.json());
    }
  
    static createProject(projectData) {
      return fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })
      .then(response => response.json());
    }
  
    static updateProject(projectId, projectData) {
      return fetch(`http://localhost:3000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })
      .then(response => response.json());
    }
  
    static deleteProject(projectId) {
      return fetch(`http://localhost:3000/api/projects/${projectId}`, {
        method: 'DELETE'
      })
      .then(response => response.json());
    }
  
   
  static fetchTasksByProject(projectId) {
    return fetch(`http://localhost:3000/api/projects/${projectId}/tasks`)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      });
  }

  static createTask(projectId, taskData) {
    return fetch(`http://localhost:3000/api/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    });
  }

  static updateTask(taskId, taskData) {
    return fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    });
  }

  static deleteTask(taskId) {
    return fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    });
  }
}
  