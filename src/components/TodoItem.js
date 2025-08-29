import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleToggleComplete = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, {
        ...todo,
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          id={`todo-${todo._id}`}
        />
        <label htmlFor={`todo-${todo._id}`} className="checkbox-label">
          <span className="checkmark"></span>
        </label>
      </div>

      <div className="todo-content">
        {isEditing ? (
          <div className="todo-edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="edit-title-input"
              placeholder="Назва задачі"
              autoFocus
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={handleKeyPress}
              className="edit-description-input"
              placeholder="Опис задачі (необов'язково)"
              rows="2"
            />
            <div className="edit-actions">
              <button onClick={handleSave} className="save-button">
                Зберегти
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Скасувати
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-info">
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
            <div className="todo-meta">
              <span className="todo-date">
                Створено: {formatDate(todo.createdAt)}
              </span>
              {todo.updatedAt !== todo.createdAt && (
                <span className="todo-date">
                  Оновлено: {formatDate(todo.updatedAt)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button
            onClick={handleEdit}
            className="edit-button"
            title="Редагувати"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="delete-button"
            title="Видалити"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
