import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: 'fa-book',
      title: 'Digital Learning',
      description: 'Access lessons and educational materials anytime, anywhere.',
    },
    {
      icon: 'fa-tasks',
      title: 'Assignment Management',
      description: 'Submit and track assignments with ease.',
    },
    {
      icon: 'fa-comments',
      title: 'Communication',
      description: 'Stay connected with teachers and classmates.',
    },
    {
      icon: 'fa-calendar-check',
      title: 'Event Planning',
      description: 'Keep track of important dates and school events.',
    },
  ];

  const stats = [
    { number: '1000+', label: 'Students' },
    { number: '100+', label: 'Teachers' },
    { number: '50+', label: 'Courses' },
    { number: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/15 bg-grid-16"></div>
        <div className="relative container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome to MySchool Management System
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Streamline your educational journey with our comprehensive school management platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/lessons"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                Start Learning
              </Link>
              <Link
                to="/profile"
                className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose MySchool?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className={`fas ${feature.icon} text-blue-600 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 rounded-3xl py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-blue-600">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 rounded-3xl text-center py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our community of learners and educators to experience a new way of managing education.
          </p>
          <Link
            to="/profile"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;