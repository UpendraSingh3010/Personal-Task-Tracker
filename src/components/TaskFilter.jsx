import React from 'react';

const TaskFilter = ({ filter, setFilter, counts }) => {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
  ];

  return (
    <div className="task-filter">
      {filters.map((f) => (
        <button
          key={f.value}
          className={filter === f.value ? 'active' : ''}
          onClick={() => setFilter(f.value)}
        >
          {f.label} ({counts[f.value] || 0})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter; 