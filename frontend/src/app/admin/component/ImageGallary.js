'use client'
import React from 'react';

const ImageGallery = ({ pictures, setEditPictureId, setPictureFormData }) => {
  const handleEdit = (picture) => {
    setEditPictureId(picture.id);
    setPictureFormData({
      ImageFor: picture.ImageFor,
    });
  };

  const handleDelete = async (picture) => {
    let id = picture.id;
    try {
      const res = await fetch(`http://localhost:3000/api/gallary/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setPictures(pictures.filter(p => p.id !== id));
      } else {
        console.error('Error deleting picture:', result.message);
      }
    } catch (error) {
      console.error('Error deleting picture:', error);
    }

    // Refresh the picture list
    const updatedPictures = await (await fetch('http://localhost:3000/api/getGallary')).json();
    setPictures(updatedPictures);
  };

  return (
    <div>
      {pictures.map(picture => (
        <div key={picture.id} className="border p-2 mb-2 rounded">
          <img src={picture.imageUrl} alt={picture.ImageFor} className="w-full h-auto mb-2" />
          <p>{picture.ImageFor}</p>
          <div className="space-x-2">
            <button onClick={() => handleEdit(picture)} className="text-blue-500">Edit</button>
            <button onClick={() => handleDelete(picture)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
