import React, { useState } from 'react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - In a real app, this would come from an API/backend
  const [userData, setUserData] = useState({
    name: 'John Doe',
    role: 'Student',
    email: 'john.doe@myschool.com',
    grade: '10th Grade',
    studentId: 'STU2024001',
    phone: '+1 (555) 123-4567',
    address: '123 Student Lane, Education City, 12345',
    subjects: ['Mathematics', 'Physics', 'English', 'History'],
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
  });

  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
    // Here you would typically make an API call to update the user data
  };

  const stats = [
    { label: 'Assignments Completed', value: '45/50' },
    { label: 'Average Grade', value: '92%' },
    { label: 'Attendance Rate', value: '95%' },
    { label: 'Active Courses', value: '6' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-32 h-32 rounded-full border-4 border-blue-100"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
            <p className="text-gray-600">{userData.role} - {userData.grade}</p>
            <p className="text-gray-500 text-sm">ID: {userData.studentId}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary"
            >
              <i className="fas fa-edit mr-2"></i>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4 text-center">
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === 'info'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Personal Information
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              activeTab === 'academic'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('academic')}
          >
            Academic Details
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={isEditing ? formData.name : userData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={isEditing ? formData.email : userData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={isEditing ? formData.phone : userData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={isEditing ? formData.address : userData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input"
                  />
                </div>
              </div>
              {isEditing && (
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(userData);
                      setIsEditing(false);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          )}

          {activeTab === 'academic' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Enrolled Subjects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 flex items-center gap-3"
                  >
                    <i className="fas fa-book text-blue-600"></i>
                    <span>{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;