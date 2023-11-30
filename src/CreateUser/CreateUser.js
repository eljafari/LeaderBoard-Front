import axios from 'axios';
import React, {useState} from 'react';
import './CreateUser.css'
import { Link } from 'react-router-dom';

const CreateUser = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [userAdded, setUserAdded] = useState(false); 
    const [nameError, setNameError] = useState(false);

    const handleCreateUser = () => {
        if(!name){
          setNameError(true);        
          return;
        };
        setNameError(false);

        const newUser = {
            name: name,
            age: age,
            address: address,
        };

        // Send a POST request to backend to create the user
        axios.post('http://127.0.0.1:8000/api/users', newUser)
            .then((response) => {
            console.log('User created successfully', response.data);
            setName('');
            setAge('');
            setAddress('');
            setUserAdded(true);
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
            {nameError && <span  className="error">Name is required</span>}
          </div>
          <div className='inputWrap'>
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className='inputWrap'>
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <button className='createUserBtn' type="button" onClick={handleCreateUser}>Create User</button>
          {userAdded && <p>User successfully added !</p>}
        </form>
      </div>
    );
  }

export default CreateUser
