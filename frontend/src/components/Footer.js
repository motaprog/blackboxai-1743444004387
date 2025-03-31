import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer sections data
  const sections = {
    quickLinks: [
      { label: 'الرئيسية', path: '/' },
      { label: 'عن المدرسة', path: '/about' },
      { label: 'اتصل بنا', path: '/contact' },
      { label: 'الأسئلة الشائعة', path: '/faq' },
    ],
    resources: [
      { label: 'دليل المستخدم', path: '/guide' },
      { label: 'المكتبة الرقمية', path: '/library' },
      { label: 'التقويم الدراسي', path: '/calendar' },
    ],
    social: [
      { label: 'تويتر', icon: 'fab fa-twitter', url: 'https://twitter.com' },
      { label: 'فيسبوك', icon: 'fab fa-facebook', url: 'https://facebook.com' },
      { label: 'انستغرام', icon: 'fab fa-instagram', url: 'https://instagram.com' },
      { label: 'يوتيوب', icon: 'fab fa-youtube', url: 'https://youtube.com' },
    ]
  };

  // Scroll to top function with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">نظام المدرسة</h3>
            <p className="text-gray-400 leading-relaxed">
              نظام إدارة تعليمي متكامل يهدف إلى تسهيل العملية التعليمية وتحسين التواصل بين الطلاب والمعلمين والإدارة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {sections.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-semibold mb-4">مصادر مفيدة</h4>
            <ul className="space-y-2">
              {sections.resources.map((resource, index) => (
                <li key={index}>
                  <Link 
                    to={resource.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">تواصل معنا</h4>
            <div className="flex space-x-4">
              {sections.social.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-2xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} نظام المدرسة. جميع الحقوق محفوظة
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
          >
            <span>العودة للأعلى</span>
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>

      {/* Interactive Animation Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Add hover effect to social icons
          document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseover', function() {
              this.style.transform = 'scale(1.2)';
            });
            icon.addEventListener('mouseout', function() {
              this.style.transform = 'scale(1)';
            });
          });
        `
      }} />
    </footer>
  );
};

export default Footer;