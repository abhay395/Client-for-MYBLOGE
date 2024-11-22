import React, { useState } from 'react';
import { Cloudinary } from 'cloudinary-core';

const upload = () => {
  const [progress, setProgress] = useState(0);

  const handleUpload = (file) => {
    const cloudinary = new Cloudinary({ cloud_name: 'your_cloud_name' });
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentUploaded = Math.round((event.loaded / event.total) * 100);
        setProgress(percentUploaded);
      }
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Handle the successful upload
          console.log('File uploaded successfully');
        } else {
          // Handle upload failure
          console.error('Error uploading file:', xhr.statusText);
        }
      }
    };

    xhr.open('POST', cloudinary.url('your_upload_preset'), true);
    xhr.send(formData);
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />

      {progress > 0 && progress < 100 && (
        <div>
          <p>{`Uploading: ${progress}%`}</p>
          {/* You can use a progress bar or other UI elements to visualize the progress */}
          <div style={{ width: `${progress}%`, height: '20px', backgroundColor: '#36D7B7' }} />
        </div>
      )}
    </div>
  );
};

export default upload;
