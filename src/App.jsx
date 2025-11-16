import React, { useState, useEffect } from 'react';
import { userService } from './services/api';
import UserForm from './components/UserForm.jsx';
import UserList from './components/UserList.jsx';

import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      alert('Error loading users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = () => {
    loadUsers(); // Reload users after adding/updating
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        loadUsers(); // Reload users after deletion
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
    }
  };

  const handleInitializeData = async () => {
    try {
      await userService.initializeData();
      loadUsers(); // Reload users after initialization
      alert('Sample data initialized!');
    } catch (error) {
      alert('Error initializing data: ' + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management System</h1>
        <p>React Frontend + Spring Boot Backend</p>
      </header>

      <main className="App-main">
        <div className="container">
          <div className="actions-bar">
            <button onClick={loadUsers} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh Users'}
            </button>
            <button onClick={handleInitializeData}>
              Initialize Sample Data
            </button>
          </div>

          <div className="content">
            <div className="form-section">
              <UserForm
                onUserAdded={handleUserAdded}
                editingUser={editingUser}
                onCancelEdit={handleCancelEdit}
              />
            </div>

            <div className="list-section">
              <UserList
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;