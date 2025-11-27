import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, settasks] = useState([]);

 
  const [newTask, setNewTask] = useState('');

  
  const addTask = () => {
    if (newTask.trim() !== '') {
      const Task = {
        id: Date.now(), 
        text: newTask,
        completed: false
      };
      settasks([...tasks, Task]);
      setNewTask('');
    }
  }

  
  const deleteTask = (id) => {
    settasks(tasks.filter(Task => Task.id !== id));
  };

  const toggleTask = (id) => {
    settasks(tasks.map(Task =>
      Task.id === id ? { ...Task, completed: !Task.completed } : Task
    ));
  };

  return (
    <div className="App">
      <h1>Мой Чеклист</h1>
      
      {/* Форма добавления */}
      <div className="add-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Добавьте новое дело..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      {/* Список дел */}
      <div className="Task-list">
        {tasks.map(Task => (
          <div key={Task.id} className={`Task-item ${Task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={Task.completed}
              onChange={() => toggleTask(Task.id)}
            />
            <span className="Task-text">{Task.text}</span>
            <button onClick={() => deleteTask(Task.id)}>Удалить</button>
          </div>
        ))}
      </div>

      {/* Статистика */}
      <div className="stats">
        Всего дел: {tasks.length} | 
        Выполнено: {tasks.filter(Task => Task.completed).length}
      </div>
    </div>
  );
}

export default App;