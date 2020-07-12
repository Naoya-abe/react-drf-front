import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: '', title: '' });
  const [id, setId] = useState(1);
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/tasks/', {
        headers: {
          Authorization: 'Token 541c56b42a2a3005193b6d21f162956535787891',
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://localhost:8080/api/tasks/${id}`, {
        headers: {
          Authorization: 'Token 541c56b42a2a3005193b6d21f162956535787891',
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/api/tasks/${id}/`, {
        headers: {
          Authorization: 'Token 541c56b42a2a3005193b6d21f162956535787891',
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
      });
  };

  const newTask = (task) => {
    const data = { title: task.title };
    axios
      .post(`http://localhost:8080/api/tasks/`, data, {
        headers: {
          Authorization: 'Token 541c56b42a2a3005193b6d21f162956535787891',
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setEditedTask({ id: '', title: '' });
      });
  };

  const editTask = (task) => {
    axios
      .put(`http://localhost:8080/api/tasks/${task.id}/`, task, {
        headers: {
          Authorization: 'Token 541c56b42a2a3005193b6d21f162956535787891',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => (task.id === editedTask.id ? res.data : task))
        );
        setEditedTask({ id: '', title: '' });
      });
  };

  const handleInputChange = () => (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className='fas fa-trash-alt' />
            </button>
            <button onClick={() => setEditedTask(task)}>
              <i className='fas fa-pen' />
            </button>
          </li>
        ))}
      </ul>
      <input
        type='text'
        value={id}
        onChange={(evt) => {
          setId(evt.target.value);
        }}
      />
      <br />
      <button type='button' onClick={() => getTask()}>
        Get task
      </button>
      {/* <button type='button' onClick={() => deleteTask()}>
        Delete task
      </button> */}
      <h3>
        {selectedTask.title} {selectedTask.id}
      </h3>
      <input
        type='text'
        name='title'
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder='New task ?'
        required
      />
      {editedTask.id ? (
        <button onClick={() => editTask(editedTask)}>Update</button>
      ) : (
        <button onClick={() => newTask(editedTask)}>Create</button>
      )}
    </div>
  );
};

export default DrfApiFetch;
