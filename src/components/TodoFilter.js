import React from 'react';
import './TodoFilter.css';

const TodoFilter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { key: 'all', label: 'Всі' },
    { key: 'active', label: 'Активні' },
    { key: 'completed', label: 'Виконані' },
  ];

  return (
    <div className="todo-filter">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${currentFilter === filter.key ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
