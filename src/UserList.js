import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
     // Fetch users from the API endpoint
    axios.get('http://127.0.0.1:8000/api/users') 
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Make a PUT request to update user points
  const updateUserPoints = (user, change) => {
    const updatedPoints = user.points + change;

    axios.put(`http://127.0.0.1:8000/api/users/edit/points/${user.id}`, {
      points: updatedPoints,
    })
      .then((response) => {
        // Update the user's points in the local state
        const updatedUsers = users.map((u) =>
          u.id === user.id ? { ...u, points: user.points + change } : u
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error('Error updating user points:', error);
      });
  };

  // Send a DELETE request to remove the user from the database
  const deleteUser = (userId) => {
    axios.delete(`http://localhost:8000/api/users/delete/${userId}`)
      .then(() => {
        // Filter out the deleted user from the local state
        const updatedUsers = users.filter((u) => u.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };



  return (
    <div>
      <h2>Leaderboard Application</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button className='button delete' onClick={() => deleteUser(user.id)}>Delete</button>
            <span>Name: {user.name}</span>
            <span>Points: {user.points}</span>
            <button className='button' onClick={() => updateUserPoints(user, 1)}>+</button>
            <button className='button'  onClick={() => updateUserPoints(user, -1)}>-</button>
          </li>
        ))}
      </ul>
      <Link className='addButton' to="/create-user">Add User</Link>
    </div>
  );
}

export default UserList;
