import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../store';
import './UserList.css';

const UserList = () => {
  const users = useSelector((state) => state.userState.users);
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState(null);

  const getProfileImage = (user) => {
    return user.gender === 'male'
      ? 'https://static.vecteezy.com/system/resources/previews/001/541/050/original/boy-cartoon-face-free-vector.jpg'
      : 'https://c4.wallpaperflare.com/wallpaper/191/167/685/cartoons-wallpaper-preview.jpg';
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateUser(editingUser));
    setEditingUser(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="user-list">
      <h2>All Users</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            {user.image ? (
              <img src={user.image} alt={`${user.name}'s profile`} className="user-image" />
            ) : (
              <img src={getProfileImage(user)} alt={`${user.name}'s profile`} className="user-image" />
            )}
            <h3>{user.name}</h3>
            <p><strong>Profession:</strong> {user.profession}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </div>
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancel}>&times;</span>
            <h2>Edit User</h2>
            <form onSubmit={handleSave}>
              <input type="text" name="name" value={editingUser.name} onChange={handleChange} placeholder="Name" required />
              <input type="text" name="profession" value={editingUser.profession} onChange={handleChange} placeholder="Profession" required />
              <input type="number" name="age" value={editingUser.age} onChange={handleChange} placeholder="Age" required />
              <select name="gender" value={editingUser.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
