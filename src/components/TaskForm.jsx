import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'Medium');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'Medium');
      setDueDate(initialData.dueDate || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, description, priority, dueDate });
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="priority-selector">
        <label>Priority: </label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="due-date-selector">
        <label>Due Date: </label>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
      <div className="task-form-actions">
        <button type="submit">{initialData ? 'Update' : 'Add'} Task</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm; 