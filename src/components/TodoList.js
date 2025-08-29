import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo, 
  setFilter,
  clearError 
} from '../store/slices/todoSlice';
import { logoutUser } from '../store/slices/authSlice';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import './TodoList.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading, error, filter } = useSelector((state) => state.todos);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    dispatch(fetchTodos());
  }, [dispatch, isAuthenticated, navigate]);

  const handleCreateTodo = async (todoData) => {
    try {
      const result = await dispatch(createTodo(todoData));
      if (result.type === 'todos/createTodo/fulfilled') {
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      await dispatch(updateTodo({ id, todoData }));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю задачу?')) {
      try {
        await dispatch(deleteTodo(id));
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const filteredTodos = items.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = items.filter(todo => !todo.completed).length;
  const completedTodosCount = items.filter(todo => todo.completed).length;

  return (
    <div className="todo-container">
      <header className="todo-header">
        <div className="header-content">
          <h1>Мої Задачі</h1>
          <div className="user-info">
            <span>Привіт, {user?.username || user?.email}!</span>
            <button onClick={handleLogout} className="logout-button">
              Вийти
            </button>
          </div>
        </div>
      </header>

      <main className="todo-main">
        <div className="todo-stats">
          <div className="stat-item">
            <span className="stat-number">{activeTodosCount}</span>
            <span className="stat-label">Активні</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{completedTodosCount}</span>
            <span className="stat-label">Виконані</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{items.length}</span>
            <span className="stat-label">Всього</span>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button 
              onClick={() => dispatch(clearError())} 
              className="error-close"
            >
              ×
            </button>
          </div>
        )}

        <div className="todo-controls">
          <TodoFilter currentFilter={filter} onFilterChange={(newFilter) => dispatch(setFilter(newFilter))} />
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="add-button"
          >
            {showForm ? 'Скасувати' : '+ Додати задачу'}
          </button>
        </div>

        {showForm && (
          <TodoForm 
            onSubmit={handleCreateTodo}
            onCancel={() => setShowForm(false)}
            isLoading={isLoading}
          />
        )}

        <div className="todo-list">
          {isLoading && items.length === 0 ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Завантаження задач...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>
                {filter === 'active' 
                  ? 'Немає активних задач' 
                  : filter === 'completed' 
                  ? 'Немає виконаних задач' 
                  : 'Немає задач'
                }
              </h3>
              <p>
                {filter === 'active' 
                  ? 'Всі задачі виконані! Відмінна робота!' 
                  : filter === 'completed' 
                  ? 'Ще немає виконаних задач. Час приступити до роботи!' 
                  : showForm 
                  ? 'Заповніть форму вище, щоб створити першу задачу.' 
                  : 'Натисніть "Додати задачу", щоб почати.'
                }
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TodoList;
