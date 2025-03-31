import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About MySchool</h3>
            <p className="text-gray-600 text-sm">
              MySchool is a comprehensive school management system designed to streamline educational processes and enhance communication between students, teachers, and administrators.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/lessons" className="text-gray-600 hover:text-blue-600 text-sm">
                  <i className="fas fa-book mr-2"></i>Lessons
                </Link>
              </li>
              <li>
                <Link to="/assignments" className="text-gray-600 hover:text-blue-600 text-sm">
                  <i className="fas fa-tasks mr-2"></i>Assignments
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-blue-600 text-sm">
                  <i className="fas fa-calendar mr-2"></i>Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                <i className="fas fa-envelope mr-2"></i>
                support@myschool.com
              </li>
              <li className="text-gray-600 text-sm">
                <i className="fas fa-phone mr-2"></i>
                +1 (555) 123-4567
              </li>
              <li className="text-gray-600 text-sm">
                <i className="fas fa-map-marker-alt mr-2"></i>
                123 Education St, Learning City
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/myschool" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a 
                href="https://twitter.com/myschool" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a 
                href="https://instagram.com/myschool" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="https://linkedin.com/company/myschool" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-800 transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} MySchool. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;