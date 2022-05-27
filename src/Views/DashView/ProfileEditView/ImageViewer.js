import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileUploader from './FileUploader';
import 'react-image-gallery/styles/css/image-gallery.css';
import toast from 'react-hot-toast';

const ImageViewer = ({ setUser, userImages }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [selectedImage, setSelectedImage] = useState(
    userImages.length === 0 ? './images/no-image.jpg' : userImages[0]
  );

  const deleteImage = (image) => {
    axios
      .post('users/delete-image', {
        user_id: currentUser._id,
        image_path: image,
      })
      .then((response) => {
        if (response.status === 200) {
          axios
            .post('users/get-user', { user_id: currentUser._id })
            .then((response) => {
              setUser(response.data[0]);
              toast.success('Image deleted!');
            });
        }
      });
  };

  const renderThumbnails = () => {
    let elements = [];
    const fileUploadersCount = 3 - userImages.length;
    userImages.map((userImage) => {
      elements.push(
        <div className='col-4'>
          <div className='file-upload-btn-holder d-flex justify-content-center align-items-center'>
            <img
              className='file-upload-btn-img hvr-grow'
              src={userImage}
              onClick={() => setSelectedImage(userImage)}
            />
            <img
              className='file-delete-btn-img hvr-shrink'
              src='./images/file-delete-icon.png'
              onClick={() => deleteImage(userImage)}
            />
          </div>
        </div>
      );
    });
    for (let i = 1; i <= fileUploadersCount; i++) {
      elements.push(
        <div className='col-4'>
          <FileUploader setUser={setUser} />
        </div>
      );
    }
    return elements;
  };

  return (
    <>
      <div className='current-image-holder'>
        <img src={selectedImage} className='file-upload-btn-img file-img' />
      </div>
      <div className='container ps-0 pe-3'>
        <div className='row justify-content-between thumbnails-row'>
          {renderThumbnails()}
        </div>
      </div>
    </>
  );
};

export default ImageViewer;
