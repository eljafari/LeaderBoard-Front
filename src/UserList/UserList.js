import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); 


  useEffect(() => {
     // Fetch users from the API endpoint
    axios.get('http://localhost:8000/api/users') 
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };  

  const handleSort = (field) => {
    if (sortBy === field) {
      // If the same field is clicked again, reverse the sorting order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different field is clicked, set it as the new sorting field
      setSortBy(field);
      setSortOrder('asc'); // Default to ascending order for the new field
    }
  };
  
  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'points') {
        return sortOrder === 'asc'
          ? a.points - b.points
          : b.points - a.points;
      }
      return 0;
    });

  // Make a PUT request to update user points
  const updateUserPoints = (user, change) => {
    const updatedPoints = user.points + change;

    axios.put(`http://localhost:8000/api/users/edit/points/${user.id}`, {
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
    <div className='userContainer'>
      <h2>Leaderboard Application</h2>
      <input 
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className='usersTb'>
        <tr>
          <th>Delete User</th>
          <th className='sort' onClick={() => handleSort('name')}>
          ↑↓ Name
            {sortBy === 'name'}
          </th>
          <th className='sort' onClick={() => handleSort('points')}>
          ↑↓ Point
            {sortBy === 'points'}
          </th>
          <th>Increase Points</th>
          <th>Decrease Points</th>
        </tr>
        {filteredUsers.map((user) => (
        <tr key={user.id} onClick={() => handleUserClick(user)}>
          <td>
            <button className='userButton delete' onClick={() => deleteUser(user.id)}>Delete</button>
          </td>
          <td>
            <span  onClick={() => handleUserClick(user)}>{user.name}</span>
          </td>
          <td>
            <span>{user.points}</span>
          </td>
          <td>
            <button className='userButton' onClick={() => updateUserPoints(user, 1)}>+</button>
          </td>
          <td>
            <button className='userButton'  onClick={() => updateUserPoints(user, -1)}>-</button>
          </td>
        </tr>
        ))}
      </table>
      <Link className='addButton' to="/create-user">Add User</Link>
      {selectedUser && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Age: {selectedUser.age}</p>
          <p>Points: {selectedUser.points}</p>
          <p>Address: {selectedUser.address}</p>
        </div>
      )}
    </div>
  );
}

export default UserList;
