import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { path: '/', label: 'الرئيسية', icon: 'fas fa-home' },
    { path: '/profile', label: 'الملف الشخصي', icon: 'fas fa-user' },
    { path: '/lessons', label: 'الدروس', icon: 'fas fa-book' },
    { path: '/assignments', label: 'الواجبات', icon: 'fas fa-tasks' },
    { path: '/messaging', label: 'الرسائل', icon: 'fas fa-envelope' },
    { path: '/events', label: 'الأحداث', icon: 'fas fa-calendar' },
    { path: '/statistics', label: 'الإحصائيات', icon: 'fas fa-chart-bar' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors duration-200"
          >
            نظام المدرسة
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link flex items-center gap-2 ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas fa-${isOpen ? 'times' : 'bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block py-2 px-4 rounded-lg ${
                      location.pathname === item.path
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <i className={`${item.icon} mr-2`}></i>
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;