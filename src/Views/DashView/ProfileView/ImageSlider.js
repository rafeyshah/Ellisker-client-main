import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageSlider = ({ userImages }) => {
  let images = [];

  useEffect(() => {
    userImages.map((userImage) => {
      images.push({
        original: userImage,
        originalHeight: '300px',
        originalWidth: '300px',
      });
    });
  }, [userImages]);

  if (userImages.length === 0) {
    return (
      <div className='current-image-holder ps-0'>
        <img src='./images/no-image.jpg' className='file-upload-btn-img' />
      </div>
    );
  } else {
    return (
      <div style={{ width: '340px', height: '300px' }}>
        <ImageGallery
          items={images}
          showNav={true}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={true}
        />
      </div>
    );
  }
};

export default ImageSlider;
