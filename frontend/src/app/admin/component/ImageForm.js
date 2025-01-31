'use client'
import React from 'react';

const ImageForm = ({ pictureFormData, setPictureFormData, file, setFile, editPictureId, setEditPictureId, setPictures }) => {
  const handleChange = (e) => {
    setPictureFormData({
      ...pictureFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('ImageFor', pictureFormData.ImageFor);
    if (file) {
      data.append('image', file);
    }

    const url = editPictureId ? `http://localhost:3000/api/gallary/${editPictureId}` : 'http://localhost:3000/api/gallary';
    const method = editPictureId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      body: data,
    });

    const result = await res.json();
    console.log(result);

    setEditPictureId(null);
    setPictureFormData({
      ImageFor: ''
    });
    setFile(null);

    // Refresh the picture list
    const updatedPictures = await (await fetch('http://localhost:3000/api/getGallary')).json();
    setPictures(updatedPictures);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* form fields here */}
    </form>
  );
};

export default ImageForm;
