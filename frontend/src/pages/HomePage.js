import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from '../App';

const HomePage = () => {
  const { showNotification } = useContext(NotificationContext);

  const features = [
    {
      icon: 'fa-book',
      title: 'Digital Learning',
      description: 'Access course materials and resources anytime, anywhere',
      color: 'text-blue-600',
    },
    {
      icon: 'fa-tasks',
      title: 'Assignment Management',
      description: 'Submit and track your assignments with ease',
      color: 'text-green-600',
    },
    {
      icon: 'fa-chart-line',
      title: 'Progress Tracking',
      description: 'Monitor your academic performance in real-time',
      color: 'text-purple-600',
    },
    {
      icon: 'fa-comments',
      title: 'Communication',
      description: 'Stay connected with teachers and classmates',
      color: 'text-yellow-600',
    },
  ];

  const handleStartLearning = () => {
    showNotification('Welcome to MySchool! Start exploring your courses.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to MySchool Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Streamline your educational journey with our comprehensive school
          management platform.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStartLearning}
            className="btn btn-primary"
          >
            Start Learning
          </button>
          <Link to="/profile" className="btn btn-secondary">
            View Profile
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`text-3xl ${feature.color} mb-4`}>
              <i className={`fas ${feature.icon}`}></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-6">
          Join our learning community and enhance your educational journey
        </p>
        <Link
          to="/lessons"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Explore Courses
        </Link>
      </div>
    </div>
  );
};

export default HomePage;