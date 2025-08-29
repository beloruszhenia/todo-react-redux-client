import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
      setFormData({ title: '', description: '' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-header">
          <h3>Нова задача</h3>
        </div>
        
        <div className="form-body">
          <div className="form-group">
            <label htmlFor="title">Назва задачі *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Введіть назву задачі"
              required
              disabled={isLoading}
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Опис</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Додайте опис задачі (необов'язково)"
              rows="3"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            disabled={!formData.title.trim() || isLoading}
            className="submit-button"
          >
            {isLoading ? 'Створення...' : 'Створити задачу'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="cancel-button"
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
