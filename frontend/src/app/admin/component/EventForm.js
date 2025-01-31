'use client'
import React from 'react';

const EventForm = ({ formData, setFormData, file, setFile, editEventId, setEditEventId, setEvents }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('venue', formData.venue);
    data.append('applicationLink', formData.applicationLink);
    if (file) {
      data.append('image', file);
    }

    const url = editEventId ? `http://localhost:3000/api/events/updateEvent/${editEventId}` : 'http://localhost:3000/api/events/create';
    const method = editEventId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      body: data,
    });

    const result = await res.json();
    console.log(result);

    setEditEventId(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      venue: '',
      applicationLink: '',
    });
    setFile(null);

    // Refresh the event list
    const updatedEvents = await (await fetch('http://localhost:3000/api/events/list')).json();
    setEvents(updatedEvents);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* form fields here */}
    </form>
  );
};

export default EventForm;
