import React, { useState, useContext } from 'react';
import { NotificationContext } from '../App';

const LessonsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { showNotification } = useContext(NotificationContext);

  // Mock data - In a real app, this would come from an API
  const lessons = [
    {
      id: 1,
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      description: 'Learn the basics of algebraic expressions and equations',
      duration: '45 minutes',
      image: 'algebra.jpg',
      level: 'Intermediate',
    },
    {
      id: 2,
      title: "Newton's Laws of Motion",
      subject: 'Physics',
      description: 'Understanding the fundamental laws of motion',
      duration: '60 minutes',
      image: 'physics.jpg',
      level: 'Advanced',
    },
    {
      id: 3,
      title: 'Chemical Reactions',
      subject: 'Chemistry',
      description: 'Explore different types of chemical reactions',
      duration: '50 minutes',
      image: 'chemistry.jpg',
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'Essay Writing',
      subject: 'English',
      description: 'Master the art of writing compelling essays',
      duration: '45 minutes',
      image: 'english.jpg',
      level: 'All Levels',
    },
  ];

  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'English'];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSubject =
      selectedSubject.toLowerCase() === 'all' ||
      lesson.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    const matchesSearch = lesson.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubject && matchesSearch;
  });

  const handleStartLesson = (lesson) => {
    showNotification(`Starting lesson: ${lesson.title}`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Lessons Library</h1>
        <p className="text-gray-600">
          Access your course materials, video lectures, and study resources.
        </p>
      </div>

      {/* Filters */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject.toLowerCase()}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <i className="fas fa-play-circle text-4xl text-gray-400"></i>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {lesson.subject}
                </span>
                <span className="text-gray-500 text-sm">
                  <i className="fas fa-clock mr-2"></i>
                  {lesson.duration}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  <i className="fas fa-signal mr-2"></i>
                  {lesson.level}
                </span>
                <button
                  onClick={() => handleStartLesson(lesson)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Lesson
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
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;