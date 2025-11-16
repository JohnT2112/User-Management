import React from 'react';

const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-item">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>Country: {user.country}</p>
        <p>ID: {user.id}</p>
      </div>
      <div className="user-actions">
        <button onClick={() => onEdit(user)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(user.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;