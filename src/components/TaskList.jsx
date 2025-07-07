import React from 'react';
import TaskItem from './TaskItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return <div className="empty-list">No tasks to show.</div>;
  }
  return (
    <TransitionGroup className="task-list">
      {tasks.map((task) => (
        <CSSTransition key={task.id} timeout={350} classNames="task-fade">
          <TaskItem
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default TaskList; 