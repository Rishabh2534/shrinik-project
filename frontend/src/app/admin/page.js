'use client'
import React, { useEffect, useState } from 'react';

const AdminPanel = () => {

  const [AdminList,setAdminList]=useState([]);
  const [memberList,setMemberList]=useState([]);
  const [memberFormData, setMemberFormData] = useState({
    memberName: '',
    team: '',
    linkedinUrl: ''
  });
  const handleMemberChange = (e) => {
    setMemberFormData({
      ...memberFormData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleMemberSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('memberName', memberFormData.memberName);
    data.append('team', memberFormData.team);
    data.append('linkedinUrl', memberFormData.linkedinUrl);
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
    console.log("data",data);
    const methd='PUT';
    const res = await fetch('http://localhost:3000/api/addmember', {
      method: methd,
      body: data,
    });

    const result = await res.json();
    console.log(result);
    // Reset form after submission
    setMemberFormData({
      memberName: '',
      team: '',
      linkedinUrl: ''
    });
    const updatedMemberList = await (await fetch('http://localhost:3000/api/Allmember/list')).json();
    setMemberList(updatedMemberList);
  };
  const fetchMembers=async()=>{
    try {
      const res = await fetch('http://localhost:3000/api/Allmember/list');
      const data = await res.json();
      console.log('Fetched members:', data); // Log the fetched data
      if (Array.isArray(data)) {
        setMemberList(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  const handleDeleteMember= async(member)=>{
 
    let id=member.id;
    try {
      const res = await fetch(`http://localhost:3000/api/member/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      console.log(result);
      if (result.success) {
        setMemberList(memberList.filter(member => member.id !== id));
      } else {
        console.error('Error deleting event:', result.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }

    // Refresh the event list
    const updatedMember = await (await fetch('http://localhost:3000/api/Allmember/list')).json();
    setMemberList(updatedMember);
  };
  const fetchAdmins=async()=>{
    try {
      const res = await fetch('http://localhost:3000/api/Alladmin/list');
      const data = await res.json();
      console.log('Fetched members:', data); // Log the fetched data
      if (Array.isArray(data)) {
        setAdminList(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  const handleDeleteAdmin=async(admin)=>{
    let id=admin.id;
    try {
      const res = await fetch(`http://localhost:3000/api/admin/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      console.log(result);
      if (result.success) {
        setAdminList(AdminList.filter(member => member.id !== id));
      } else {
        console.error('Error deleting event:', result.message);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }

    // Refresh the event list
    const updatedMember = await (await fetch('http://localhost:3000/api/getAdmin/list')).json();
    setAdminList(updatedMember);
  };

  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    applicationLink: '',
  });
  const [pictureFormData,setPictureFormData]=useState({
    ImageFor:'',
  });
  const [file, setFile] = useState(null);
  const [editEventId, setEditEventId] = useState(null);
  const [pictures,setPictures]=useState([]);
  const [editPictureId,setEditPictureId]=useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/events/list');
        const data = await res.json();
        console.log('Fetched events:', data); // Log the fetched data
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    const fetchpictures= async()=>{
      try{  
        const res = await fetch('http://localhost:3000/api/getGallary');
        const data = await res.json();
        console.log('Fetched pic:', data); // Log the fetched data
        if (Array.isArray(data)) {
          setPictures(data);
        } else {
          console.error('Fetched data is not an array:', data);
        } 
      }catch(error){
        console.log("error fetching images",error);
      }
    }
    
    fetchEvents();
    fetchpictures();
    fetchMembers();
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
 
  };
  const handleImageChange=(e)=>{
    setPictureFormData({
      ...pictureFormData,
      [e.target.name]:e.target.value,
    });
  }

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
  const handleImageSubmit= async(e)=>{
    e.preventDefault();
    const data=new FormData();
    data.append('ImageFor',pictureFormData.ImageFor);
    if(file){data.append('image',file);}
    console.log("submitting");
    const url = editPictureId ? `http://localhost:3000/api/gallary/${editPictureId}` : 'http://localhost:3000/api/gallary';
    const method = editPictureId ? 'PUT' : 'POST';
    console.log("submitted");
    const res = await fetch(url, {
      method: method,
      body: data,
    });

    const result = await res.json();
    console.log(result);

    setEditEventId(null);
    setPictureFormData({
      ImageFor: ''
    });
    setFile(null);

    // Refresh the event list
    const updatedPictures = await (await fetch('http://localhost:3000/api/getGallary')).json();
    setPictures(updatedPictures);
  }
  const handelPictureEdit=(pic)=>{
    setEditPictureId(pic.id);
    setPictureFormData({
      ImageFor:pic.ImageFor

    });
  };
  const handleDelete = async (event) => {
    console.log(event);
    let id=event.id;
    try {
      const res = await fetch(`http://localhost:3000/api/events/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      console.log(result);
      if (result.success) {
        setEvents(events.filter(event => event.id !== id));
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

  const handleEdit = (event) => {
    console.log(event._id);
    setEditEventId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      venue: event.venue,
      applicationLink: event.applicationLink,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Event Management */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl lg:text-3xl text-blue-600 font-semibold text-center mb-6">Event Management</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="title" className="text-gray-800 font-medium mb-2">Event Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="venue" className="text-gray-800 font-medium mb-2">Venue</label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    placeholder="Venue"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                </div>
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-800 font-medium mb-2">Event Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="date" className="text-gray-800 font-medium mb-2">Date and Time</label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    placeholder="dd-mm-yyyy --:--"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="applicationLink" className="text-gray-800 font-medium mb-2">Application Link</label>
                  <input
                    type="url"
                    id="applicationLink"
                    name="applicationLink"
                    placeholder="Application Link"
                    value={formData.applicationLink}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
                  />
                </div>
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="image" className="text-gray-800 font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              <div className="text-center">
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  {editEventId ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
  
          {/* Existing Events Section */}
          <div className="bg-white shadow-md rounded-lg">
            <h2 className="text-blue-800 text-2xl font-semibold text-center py-4">Existing Events</h2>
            <div className="h-96 overflow-y-auto border-t">
              <div className="space-y-4 p-4">
                {events.map((event) => (
                  <div 
                    key={event._id} 
                    className="border rounded-lg p-4 hover:shadow-lg transition duration-200 flex flex-col md:flex-row items-center"
                  >
                    {event.imageUrl && (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-24 h-24 object-cover rounded-lg mr-4 mb-4 md:mb-0" 
                      />
                    )}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <p className="text-gray-600 text-sm word-break">{event.description}</p>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>{event.date}</p>
                        <p>{event.venue}</p>
                        <a href={event.applicationLink} className="text-blue-500 hover:underline">
                          Application Link
                        </a>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Column: Picture Management */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="ImageFor" className="text-gray-800 font-medium mb-2">Image Description</label>
                <input
                  type="text"
                  id="ImageFor"
                  name="ImageFor"
                  placeholder="Describe the image"
                  value={pictureFormData.ImageFor}
                  onChange={handleImageChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="image" className="text-gray-800 font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              <div className="text-center">
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  {editPictureId ? 'Update Image' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
  
          {/* Pictures Gallery */}
          <div className="bg-white shadow-md rounded-lg">
            <h2 className="text-blue-800 text-2xl font-semibold text-center py-4">Pictures Gallery</h2>
            <div className="h-96 overflow-y-auto border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {pictures.map((pic) => (
                  <div key={pic._id} className="border rounded-lg p-4 text-center hover:shadow-lg transition duration-200">
                    {pic.imageUrl && (
                      <img 
                        src={pic.imageUrl} 
                        alt={pic.ImageFor} 
                        className="w-full h-40 object-cover rounded-lg mb-2" 
                      />
                    )}
                    <h3 className="text-sm font-bold truncate">{pic.ImageFor}</h3>
                    <button
                      onClick={() => handelPictureEdit(pic)}
                      className="mt-2 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Add Members Form - Full Width */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl lg:text-3xl text-blue-600 font-semibold text-center mb-6">Add Team Member</h1>
        <form onSubmit={handleMemberSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="memberName" className="text-gray-800 font-medium mb-2">Member Name</label>
              <input
                type="text"
                id="memberName"
                name="memberName"
                placeholder="Full Name"
                value={memberFormData.memberName}
                onChange={handleMemberChange}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="team" className="text-gray-800 font-medium mb-2">Team</label>
              <input
                type="text"
                id="team"
                name="team"
                placeholder="Team Name"
                value={memberFormData.team}
                onChange={handleMemberChange}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedinUrl" className="text-gray-800 font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                id="linkedinUrl"
                name="linkedinUrl"
                placeholder="LinkedIn Profile URL"
                value={memberFormData.linkedinUrl}
                onChange={handleMemberChange}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
              />
            </div>
          </div>
  
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Member
            </button>
          </div>
        </form>
        <div className="bg-white shadow-md rounded-lg">
            <h2 className="text-blue-800 text-2xl font-semibold text-center py-4">Existing Members</h2>
            <div className="h-96 overflow-y-auto border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {memberList.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 text-center hover:shadow-lg transition duration-200">
                    <h5>{member.name}</h5>
                    
                    <h3 className="text-sm font-bold truncate">{member.team}</h3>
                    <button
                      onClick={() => handleDeleteMember(member)}
                      className="mt-2 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg">
            <h2 className="text-blue-800 text-2xl font-semibold text-center py-4">Admins</h2>
            <div className="h-96 overflow-y-auto border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {AdminList.map((admin) => (
                  <div key={admin.id} className="border rounded-lg p-4 text-center hover:shadow-lg transition duration-200">
                    <h5>{admin.name}</h5>
                    <h3 className="text-sm font-bold truncate">{admin.Post}</h3>
                    <h3 className="text-sm font-bold truncate">{admin.team}</h3>
                    <button
                      onClick={() => handleDeleteAdmin(admin)}
                      className="mt-2 bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
  
  // Custom Tailwind CSS classes for better reusability
  
};

export default AdminPanel;
