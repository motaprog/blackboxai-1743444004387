import React, { useState } from 'react';

const LessonsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - In a real app, this would come from an API
  const subjects = [
    'All Subjects',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
  ];

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      duration: '45 minutes',
      level: 'Intermediate',
      description: 'Learn the fundamentals of algebraic expressions and equations.',
      thumbnail: 'https://via.placeholder.com/300x200',
      date: '2024-02-15',
    },
    {
      id: 2,
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      duration: '60 minutes',
      level: 'Advanced',
      description: 'Comprehensive study of Newton\'s three laws of motion with practical examples.',
      thumbnail: 'https://via.placeholder.com/300x200',
      date: '2024-02-16',
    },
    {
      id: 3,
      title: 'Cell Biology Basics',
      subject: 'Biology',
      teacher: 'Dr. Emily Brown',
      duration: '50 minutes',
      level: 'Beginner',
      description: 'Introduction to cell structure and functions.',
      thumbnail: 'https://via.placeholder.com/300x200',
      date: '2024-02-17',
    },
    // Add more mock lessons as needed
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSubject = selectedSubject === 'all' || lesson.subject.toLowerCase() === selectedSubject.toLowerCase();
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Lessons Library</h1>
        <p className="text-gray-600">
          Access your course materials, video lectures, and study resources.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
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

          {/* Search Bar */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Lessons
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Lesson Thumbnail */}
            <img
              src={lesson.thumbnail}
              alt={lesson.title}
              className="w-full h-48 object-cover"
            />

            {/* Lesson Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-info">
                  {lesson.subject}
                </span>
                <span className="badge badge-success">
                  {lesson.level}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {lesson.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {lesson.description}
              </p>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <i className="fas fa-user-tie mr-2"></i>
                {lesson.teacher}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <i className="fas fa-clock mr-2"></i>
                  {lesson.duration}
                </div>
                <div className="flex items-center">
                  <i className="fas fa-calendar mr-2"></i>
                  {lesson.date}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="btn btn-primary flex-1">
                  <i className="fas fa-play mr-2"></i>
                  Start Lesson
                </button>
                <button className="btn btn-secondary">
                  <i className="fas fa-download"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No lessons found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;