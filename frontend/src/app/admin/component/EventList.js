'use client'
import React from 'react';

const EventList = ({ events, setEditEventId, setFormData, setEvents }) => {
  const handleEdit = (event) => {
    setEditEventId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      venue: event.venue,
      applicationLink: event.applicationLink,
    });
  };

  const handleDelete = async (event) => {
    let id = event.id;
    try {
      const res = await fetch(`http://localhost:3000/api/events/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        setEvents(events.filter(e => e.id !== id));
      } else {
        console.error('Error deleting event:', result.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }

    // Refresh the event list
    const updatedEvents = await (await fetch('http://localhost:3000/api/events/list')).json();
    setEvents(updatedEvents);
  };

  return (
    <div>
      {events.map(event => (
        <div key={event.id} className="border p-2 mb-2 rounded">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.venue}</p>
          <p><a href={event.applicationLink} className="text-blue-500">{event.applicationLink}</a></p>
          <div className="space-x-2">
            <button onClick={() => handleEdit(event)} className="text-blue-500">Edit</button>
            <button onClick={() => handleDelete(event)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
