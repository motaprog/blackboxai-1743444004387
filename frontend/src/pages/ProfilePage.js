import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NotificationContext } from '../App';

const ProfilePage = () => {
  const { addNotification } = useContext(NotificationContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Mock user data - In real app, this would come from an API
  const [userData, setUserData] = useState({
    name: 'أحمد محمد',
    role: 'طالب',
    grade: 'الصف العاشر',
    email: 'ahmed@example.com',
    phone: '0123456789',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop',
    stats: {
      assignments: 15,
      completedAssignments: 12,
      averageGrade: 85,
      attendance: 95
    }
  });

  // Form state
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserData(formData);
      setIsEditing(false);
      addNotification('تم تحديث الملف الشخصي بنجاح', 'success');
    } catch (error) {
      addNotification('حدث خطأ أثناء تحديث الملف الشخصي', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true);

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
      addNotification('تم تحديث الصورة الشخصية بنجاح', 'success');
    } catch (error) {
      addNotification('حدث خطأ أثناء تحديث الصورة', 'error');
    } finally {
      setUploadingPhoto(false);
    }
  };

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
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                <i className="fas fa-camera"></i>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploadingPhoto}
                />
              </label>
              {uploadingPhoto && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-grow text-center md:text-right">
              <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
              <p className="text-gray-600 mb-2">{userData.role} - {userData.grade}</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <i className="fas fa-edit ml-2"></i>
                {isEditing ? 'إلغاء التعديل' : 'تعديل الملف الشخصي'}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <i className="fas fa-tasks text-3xl text-blue-500 mb-4"></i>
            <h3 className="text-lg font-semibold mb-2">الواجبات</h3>
            <p className="text-2xl font-bold text-gray-800">
              {userData.stats.completedAssignments}/{userData.stats.assignments}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <i className="fas fa-chart-line text-3xl text-green-500 mb-4"></i>
            <h3 className="text-lg font-semibold mb-2">المعدل</h3>
            <p className="text-2xl font-bold text-gray-800">{userData.stats.averageGrade}%</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <i className="fas fa-calendar-check text-3xl text-purple-500 mb-4"></i>
            <h3 className="text-lg font-semibold mb-2">الحضور</h3>
            <p className="text-2xl font-bold text-gray-800">{userData.stats.attendance}%</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <i className="fas fa-star text-3xl text-yellow-500 mb-4"></i>
            <h3 className="text-lg font-semibold mb-2">التقييم</h3>
            <p className="text-2xl font-bold text-gray-800">ممتاز</p>
          </motion.div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">الاسم</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">الصف</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                حفظ التغييرات
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;