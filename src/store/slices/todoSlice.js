import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from '../../services/todoService';

// Async thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoService.getTodos();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch todos');
    }
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await todoService.createTodo(todoData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create todo');
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, todoData }, { rejectWithValue }) => {
    try {
      const response = await todoService.updateTodo(id, todoData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update todo');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      await todoService.deleteTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete todo');
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: 'all', // all, active, completed
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleComplete: (state, action) => {
      const todo = state.items.find(item => item._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, setFilter, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
