import axios from 'axios';
import React, {useState} from 'react';
import './CreateUser.css';
import { Link } from 'react-router-dom';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [point, setPoint] = useState('');

    const handleCreateUser = () => {
        const newUser = {
            name: name,
            age: age,
            points: point, 
            address: address,
        };

        // Send a POST request to backend to create the user
        axios.post('http://127.0.0.1:8000/api/users/store', newUser)
            .then((response) => {
            console.log('User created successfully', response.data);
            })
            .catch((error) => {
            console.error('Error creating user:', error);
            });
    };
    return (
    <div className='nUserContainer'>
      <Link className='home' to="/">Back Home</Link>
        <h2>Create New User</h2>
        <form>
          <div className='inputWrap'>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='inputWrap'>
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className='inputWrap'>
            <label>Point:</label>
            <input type="text" value={point} onChange={(e) => setPoint(e.target.value)} />
          </div>
          <div className='inputWrap'>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <button className='createUserBtn' type="button" onClick={handleCreateUser}>Create User</button>
        </form>
      </div>
    );
  }

export default CreateUser
