import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NotificationContext } from '../App';

const HomePage = () => {
  const { addNotification } = useContext(NotificationContext);

  // Features data
  const features = [
    {
      icon: 'fas fa-user-graduate',
      title: 'الصفحات الشخصية',
      description: 'صفحة شخصية لكل مستخدم تعرض المعلومات والمهام الخاصة به'
    },
    {
      icon: 'fas fa-book',
      title: 'إدارة الدروس',
      description: 'رفع وتنزيل الدروس والواجبات بسهولة وكفاءة'
    },
    {
      icon: 'fas fa-tasks',
      title: 'نظام الواجبات',
      description: 'تقديم وتصحيح الواجبات بشكل إلكتروني مع التغذية الراجعة'
    },
    {
      icon: 'fas fa-comments',
      title: 'التواصل',
      description: 'نظام مراسلات متكامل بين الطلاب والمعلمين والإدارة'
    },
    {
      icon: 'fas fa-calendar-alt',
      title: 'الأحداث والنشاطات',
      description: 'إدارة الجداول الدراسية والنشاطات المدرسية بكفاءة'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'إحصائيات وتقارير',
      description: 'تحليل الأداء الأكاديمي وتقارير الأنشطة بشكل تفاعلي'
    }
  ];

  // Statistics data
  const stats = [
    { value: '1000+', label: 'طالب', icon: 'fas fa-users' },
    { value: '50+', label: 'معلم', icon: 'fas fa-chalkboard-teacher' },
    { value: '100+', label: 'درس', icon: 'fas fa-book-open' },
    { value: '95%', label: 'نسبة الرضا', icon: 'fas fa-smile' }
  ];

  useEffect(() => {
    // Welcome notification
    addNotification('مرحباً بك في نظام إدارة المدرسة!', 'success');

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [addNotification]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen flex items-center justify-center text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            نظام إدارة المدرسة المتكامل
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            منصة تعليمية متكاملة تجمع بين الطلاب والمعلمين والإدارة في بيئة تفاعلية واحدة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn btn-primary text-lg px-8 py-3 rounded-full hover:transform hover:scale-105 transition-all duration-300"
            >
              سجل الآن
            </Link>
            <Link
              to="/about"
              className="btn btn-secondary text-lg px-8 py-3 rounded-full hover:transform hover:scale-105 transition-all duration-300"
            >
              اعرف المزيد
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">مميزاتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl text-blue-600 mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">
                  <i className={stat.icon}></i>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-lg text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">ابدأ رحلتك التعليمية اليوم</h2>
          <p className="text-xl text-gray-400 mb-8">
            انضم إلى مجتمعنا التعليمي واستفد من جميع المميزات المتاحة
          </p>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white text-lg px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            سجل الآن مجاناً
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;