import axios from 'axios';

class ProjectsService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/projects
  createOne = (requestBody) => {
    return this.api.post('/api/projects', requestBody);
  }

  // GET /api/projects
  getAll = () => {
    return this.api.get('/api/projects');
  }

  // GET /api/projects/:id
  getOne = (id) => {
    return this.api.get(`/api/projects/${id}`);
  }

  // PUT /api/projects/:id
  updateOne = (id, requestBody) => {
    return this.api.put(`/api/projects/${id}`, requestBody);
  }

  // DELETE /api/projects/:id
  deleteProject = (id) => {
    return this.api.delete(`/api/projects/${id}`);
  } 


}

// Create one instance (object) of the service
const projectsService = new ProjectsService();

export default projectsService;