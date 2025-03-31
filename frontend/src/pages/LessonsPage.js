import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationContext } from '../App';

const LessonsPage = () => {
  const { addNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'my-lessons', 'shared'
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // Mock lessons data - In real app, this would come from an API
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'مقدمة في الرياضيات',
      subject: 'رياضيات',
      teacher: 'د. أحمد محمد',
      date: '2024-01-15',
      duration: '45 دقيقة',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300',
      downloads: 25,
      rating: 4.5,
    },
    {
      id: 2,
      title: 'قواعد اللغة العربية',
      subject: 'لغة عربية',
      teacher: 'أ. سارة أحمد',
      date: '2024-01-16',
      duration: '30 دقيقة',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300',
      downloads: 18,
      rating: 4.2,
    },
    // Add more mock lessons as needed
  ]);

  useEffect(() => {
    // Simulate loading lessons
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Handle file drop
  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      await handleFileUpload(files[0]);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file) => {
    setUploadProgress(0);
    setShowUploadModal(true);

    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }

      // Simulate successful upload
      const newLesson = {
        id: lessons.length + 1,
        title: file.name.replace(/\.[^/.]+$/, ''),
        subject: 'جديد',
        teacher: 'المعلم الحالي',
        date: new Date().toISOString().split('T')[0],
        duration: 'غير محدد',
        thumbnail: URL.createObjectURL(file),
        downloads: 0,
        rating: 0,
      };

      setLessons(prev => [newLesson, ...prev]);
      addNotification('تم رفع الدرس بنجاح', 'success');
    } catch (error) {
      addNotification('حدث خطأ أثناء رفع الدرس', 'error');
    } finally {
      setShowUploadModal(false);
      setUploadProgress(0);
    }
  };

  // Filter lessons based on search and active tab
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'my-lessons') return matchesSearch && lesson.teacher === 'المعلم الحالي';
    if (activeTab === 'shared') return matchesSearch && lesson.teacher !== 'المعلم الحالي';
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">الدروس التعليمية</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن درس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-upload"></i>
            رفع درس جديد
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        {[
          { id: 'all', label: 'جميع الدروس', icon: 'fas fa-th-large' },
          { id: 'my-lessons', label: 'دروسي', icon: 'fas fa-user' },
          { id: 'shared', label: 'الدروس المشتركة', icon: 'fas fa-share-alt' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <i className={tab.icon}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredLessons.map(lesson => (
            <motion.div
              key={lesson.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative pb-[60%]">
                <img
                  src={lesson.thumbnail}
                  alt={lesson.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-gray-600 mb-2">{lesson.subject}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span><i className="fas fa-user mr-1"></i> {lesson.teacher}</span>
                  <span><i className="fas fa-clock mr-1"></i> {lesson.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-400 mr-1"></i>
                    <span>{lesson.rating}</span>
                    <span className="mx-2">•</span>
                    <i className="fas fa-download text-gray-400 mr-1"></i>
                    <span>{lesson.downloads}</span>
                  </div>
                  
                  <button className="text-blue-500 hover:text-blue-600 transition-colors">
                    <i className="fas fa-download"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full mx-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">رفع درس جديد</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600">
                  اسحب وأفلت الملفات هنا أو
                  <label className="text-blue-500 hover:text-blue-600 cursor-pointer mx-1">
                    اختر ملفاً
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                    />
                  </label>
                </p>
              </div>

              {uploadProgress > 0 && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-2">{uploadProgress}%</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LessonsPage;