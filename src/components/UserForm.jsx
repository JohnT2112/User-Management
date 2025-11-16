import React, { useState } from 'react';
import { userService } from '../services/api';


const UserForm = ({ onUserAdded, editingUser, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: editingUser ? editingUser.name : '',
    country: editingUser ? editingUser.country : ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, formData);
      } else {
        await userService.createUser(formData);
      }
      
      setFormData({ name: '', country: '' });
      onUserAdded();
      
      if (editingUser && onCancelEdit) {
        onCancelEdit();
      }
    } catch (error) {
      alert('Error saving user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="user-form">
      <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (editingUser ? 'Update User' : 'Add User')}
          </button>
          {editingUser && (
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};


export default UserForm;