import React, { useState, useContext } from 'react';
import { NotificationContext } from '../App';

const AssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const { showNotification } = useContext(NotificationContext);

  const assignments = [
    {
      id: 1,
      title: 'Algebraic Equations Homework',
      subject: 'Mathematics',
      dueDate: '2024-02-20',
      status: 'pending',
      description: 'Complete exercises 1-10 from Chapter 3',
      points: 100,
      teacher: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2024-02-18',
      status: 'submitted',
      description: 'Write a detailed report on the pendulum experiment',
      points: 150,
      teacher: 'Prof. Michael Chen',
    },
    {
      id: 3,
      title: 'Literature Essay',
      subject: 'English',
      dueDate: '2024-02-25',
      status: 'pending',
      description: 'Write a 1000-word essay on Shakespeare\'s Macbeth',
      points: 100,
      teacher: 'Ms. Emily Brown',
    },
  ];

  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'English', 'History', 'Chemistry'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesStatus = activeTab === 'all' || assignment.status === activeTab;
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject;
    return matchesStatus && matchesSubject;
  });

  const handleSubmitAssignment = (assignmentId) => {
    showNotification('Assignment submitted successfully!', 'success');
  };

  const handleDownloadInstructions = (assignmentId) => {
    showNotification('Downloading assignment instructions...', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Assignments</h1>
        <p className="text-gray-600">
          Track your assignments, submit your work, and view grades.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Status
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('submitted')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'submitted'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Submitted
              </button>
            </div>
          </div>

          {/* Subject Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject === 'All Subjects' ? 'all' : subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-6">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {assignment.title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  assignment.status === 'submitted'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600 mb-2">
                  <i className="fas fa-book mr-2"></i>
                  {assignment.subject}
                </p>
                <p className="text-gray-600 mb-2">
                  <i className="fas fa-user-tie mr-2"></i>
                  {assignment.teacher}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">
                  <i className="fas fa-calendar mr-2"></i>
                  Due: {assignment.dueDate}
                </p>
                <p className="text-gray-600 mb-2">
                  <i className="fas fa-star mr-2"></i>
                  Points: {assignment.points}
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{assignment.description}</p>

            <div className="flex gap-4">
              {assignment.status === 'pending' && (
                <button
                  onClick={() => handleSubmitAssignment(assignment.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i className="fas fa-upload mr-2"></i>
                  Submit Assignment
                </button>
              )}
              <button
                onClick={() => handleDownloadInstructions(assignment.id)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-download mr-2"></i>
                Download Instructions
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-tasks text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No assignments found
            </h3>
            <p className="text-gray-600">
              {activeTab === 'pending'
                ? 'You have no pending assignments'
                : activeTab === 'submitted'
                ? 'You have not submitted any assignments yet'
                : 'No assignments match your filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;