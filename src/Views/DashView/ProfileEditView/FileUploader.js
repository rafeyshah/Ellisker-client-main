import React, { useRef, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const FileUploader = ({ setUser }) => {
  const [file, setFile] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('user_id', currentUser._id);
    axios
      .post('users/add-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          axios
            .post('users/get-user', { user_id: currentUser._id })
            .then((response) => {
              setUser(response.data[0]);
              localStorage.setItem(
                'currentUser',
                JSON.stringify(response.data[0])
              );
              toast.success('Image uploaded!');
            });
        }
      });
  };

  return (
    <>
      <div className='file-upload-btn-holder d-flex justify-content-center align-items-center'>
        <button className='file-upload-btn' onClick={onButtonClick}>
          <img
            className='file-upload-btn-img hvr-grow'
            src='./images/file-upload.png'
          />
        </button>
      </div>
      <input
        class='form-control'
        type='file'
        id='formFile'
        ref={inputFile}
        style={{ display: 'none' }}
        onChange={(e) => {
          handleSubmit(e);
        }}
      />
    </>
  );
};

export default FileUploader;
