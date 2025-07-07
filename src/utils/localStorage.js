export const loadTasks = () => {
  try {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadUsername = () => {
  return localStorage.getItem('username') || '';
};

export const saveUsername = (username) => {
  localStorage.setItem('username', username);
}; 