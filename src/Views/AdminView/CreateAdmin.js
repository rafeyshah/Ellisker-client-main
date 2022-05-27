import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CreateAdmin = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const toastLoadingID = toast.loading('Adding admin...');
    axios
      .post('admins/add', { name, username, password })
      .then((response) => {
        toast.dismiss(toastLoadingID);
        toast.success('Admin created!');
      })
      .catch((err) => {
        if (err.response.data.existingUser) {
          toast.dismiss(toastLoadingID);
          toast.error('Admin with this username already exists!');
        }
      });
  };

  return (
    <div className='row d-flex justify-content-center'>
      <Toaster />
      <form style={{ width: '40%' }}>
        <h1 className='pt-5 pb-3'>Add Admin</h1>
        <div class='mb-3'>
          <label class='form-label'>Name</label>
          <input
            class='form-control'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class='mb-3'>
          <label class='form-label'>Username</label>
          <input
            class='form-control'
            onChange={(e) => setUsername(e.target.value)}
            maxLength='170'
          />
        </div>
        <div class='mb-3'>
          <label class='form-label'>Password</label>
          <input
            class='form-control'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </div>
        <button
          class='btn btn-primary'
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateAdmin;
