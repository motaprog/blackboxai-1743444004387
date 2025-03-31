import React, { useState } from 'react';

const AssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data - In a real app, this would come from an API
  const assignments = [
    {
      id: 1,
      title: 'Algebraic Equations Homework',
      subject: 'Mathematics',
      dueDate: '2024-02-20',
      status: 'pending',
      description: 'Complete exercises 1-10 from Chapter 3',
      teacher: 'Dr. Sarah Johnson',
      points: 100,
      submissionType: 'document',
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2024-02-18',
      status: 'submitted',
      description: 'Write a detailed report on the pendulum experiment',
      teacher: 'Prof. Michael Chen',
      points: 150,
      submissionType: 'pdf',
      submittedDate: '2024-02-17',
      grade: 92,
    },
    {
      id: 3,
      title: 'English Literature Essay',
      subject: 'English',
      dueDate: '2024-02-25',
      status: 'pending',
      description: 'Write a 1000-word essay on Shakespeare\'s Macbeth',
      teacher: 'Ms. Emily Brown',
      points: 200,
      submissionType: 'document',
    },
  ];

  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'English', 'History', 'Chemistry'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSubject = selectedSubject === 'all' || 
                          assignment.subject.toLowerCase() === selectedSubject.toLowerCase();
    const matchesStatus = activeTab === 'all' || 
                         assignment.status === activeTab;
    return matchesSubject && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-warning';
      case 'submitted':
        return 'badge-success';
      case 'late':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Assignments</h1>
        <p className="text-gray-600">
          Track your assignments, submit your work, and view grades.
        </p>
      </div>

      {/* Filters and Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Subject Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value.toLowerCase())}
              className="input"
            >
              {subjects.map((subject, index) => (
                <option key={index} value={subject.toLowerCase()}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Status Tabs */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Status
            </label>
            <div className="flex rounded-lg border border-gray-200 p-1">
              {['all', 'pending', 'submitted'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
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
            <div className="flex flex-col md:flex-row gap-6">
              {/* Assignment Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`badge ${getStatusBadgeClass(assignment.status)}`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                  <span className="badge badge-info">
                    {assignment.subject}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {assignment.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {assignment.description}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <i className="fas fa-user-tie mr-2"></i>
                    {assignment.teacher}
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-calendar mr-2"></i>
                    Due: {assignment.dueDate}
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-star mr-2"></i>
                    Points: {assignment.points}
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="flex flex-col justify-center items-center md:items-end gap-4 min-w-[200px]">
                {assignment.status === 'submitted' ? (
                  <>
                    <div className="text-center md:text-right">
                      <div className="text-3xl font-bold text-green-600">
                        {assignment.grade}%
                      </div>
                      <div className="text-sm text-gray-500">
                        Submitted: {assignment.submittedDate}
                      </div>
                    </div>
                    <button className="btn btn-secondary w-full md:w-auto">
                      <i className="fas fa-eye mr-2"></i>
                      View Submission
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary w-full md:w-auto">
                      <i className="fas fa-upload mr-2"></i>
                      Submit Assignment
                    </button>
                    <button className="btn btn-secondary w-full md:w-auto">
                      <i className="fas fa-download mr-2"></i>
                      Download Instructions
                    </button>
                  </>
                )}
              </div>
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
              Try adjusting your filters to see more assignments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsPage;