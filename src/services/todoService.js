import api from './api';

const todoService = {
  // Get all todos for current user
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data.data.todos;
  },

  // Create new todo
  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data.data.todo;
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data.data.todo;
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data.data.todo;
  },

  // Toggle todo completion
  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data.data.todo;
  },

  // Get todo statistics
  getStats: async () => {
    const response = await api.get('/todos/stats/summary');
    return response.data.data.stats;
  },

  // Delete all completed todos
  deleteCompletedTodos: async () => {
    const response = await api.delete('/todos/completed/all');
    return response.data.data;
  },
};

export default todoService;
