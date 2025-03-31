import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationContext } from '../App';

const AssignmentsPage = () => {
  const { addNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'submitted', 'graded'
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitProgress, setSubmitProgress] = useState(0);

  // Mock assignments data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'حل معادلات الدرجة الثانية',
      subject: 'رياضيات',
      teacher: 'د. أحمد محمد',
      dueDate: '2024-02-01',
      status: 'pending',
      description: 'حل التمارين في الصفحات 45-48 من الكتاب المدرسي',
      points: 100,
      attachments: ['worksheet.pdf'],
    },
    {
      id: 2,
      title: 'تحليل النص الأدبي',
      subject: 'لغة عربية',
      teacher: 'أ. سارة أحمد',
      dueDate: '2024-01-30',
      status: 'submitted',
      description: 'تحليل القصيدة المرفقة وتحديد الأساليب البلاغية',
      points: 50,
      grade: null,
      submissionDate: '2024-01-28',
    },
    {
      id: 3,
      title: 'تجربة المختبر',
      subject: 'علوم',
      teacher: 'د. محمد علي',
      dueDate: '2024-01-25',
      status: 'graded',
      description: 'كتابة تقرير عن تجربة الكيمياء في المختبر',
      points: 75,
      grade: 70,
      feedback: 'عمل جيد، لكن يحتاج إلى تحسين في تنظيم المعلومات',
    },
  ]);

  useEffect(() => {
    // Simulate loading assignments
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Handle assignment submission
  const handleSubmit = async (assignmentId, files) => {
    setSubmitProgress(0);
    
    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setSubmitProgress(i);
      }

      // Update assignment status
      setAssignments(prev => prev.map(assignment => {
        if (assignment.id === assignmentId) {
          return {
            ...assignment,
            status: 'submitted',
            submissionDate: new Date().toISOString().split('T')[0],
          };
        }
        return assignment;
      }));

      addNotification('تم تسليم الواجب بنجاح', 'success');
      setShowSubmitModal(false);
    } catch (error) {
      addNotification('حدث خطأ أثناء تسليم الواجب', 'error');
    }
  };

  // Filter assignments based on active tab
  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === 'pending') return assignment.status === 'pending';
    if (activeTab === 'submitted') return assignment.status === 'submitted';
    if (activeTab === 'graded') return assignment.status === 'graded';
    return true;
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">الواجبات المدرسية</h1>
        
        {/* Tabs */}
        <div className="flex gap-4 border-b">
          {[
            { id: 'pending', label: 'قيد الانتظار', icon: 'fas fa-clock' },
            { id: 'submitted', label: 'تم التسليم', icon: 'fas fa-check' },
            { id: 'graded', label: 'تم التصحيح', icon: 'fas fa-star' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 flex items-center gap-2 border-b-2 transition-colors ${
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
      </div>

      {/* Assignments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredAssignments.map(assignment => (
            <motion.div
              key={assignment.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                  <p className="text-gray-600 mb-4">{assignment.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span><i className="fas fa-book mr-1"></i> {assignment.subject}</span>
                    <span><i className="fas fa-user mr-1"></i> {assignment.teacher}</span>
                    <span><i className="fas fa-calendar mr-1"></i> تاريخ التسليم: {assignment.dueDate}</span>
                    <span><i className="fas fa-star mr-1"></i> الدرجة: {assignment.points} نقطة</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-4">
                  {assignment.status === 'pending' && (
                    <button
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setShowSubmitModal(true);
                      }}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      تسليم الواجب
                    </button>
                  )}

                  {assignment.status === 'submitted' && (
                    <div className="text-yellow-500">
                      <i className="fas fa-clock mr-2"></i>
                      في انتظار التصحيح
                    </div>
                  )}

                  {assignment.status === 'graded' && (
                    <div className="text-green-500">
                      <i className="fas fa-check-circle mr-2"></i>
                      الدرجة: {assignment.grade}/{assignment.points}
                    </div>
                  )}
                </div>
              </div>

              {assignment.status === 'graded' && assignment.feedback && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">ملاحظات المعلم:</h4>
                  <p className="text-gray-600">{assignment.feedback}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Submit Assignment Modal */}
      <AnimatePresence>
        {showSubmitModal && selectedAssignment && (
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
                <h2 className="text-2xl font-bold">تسليم الواجب</h2>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">{selectedAssignment.title}</h3>
                <p className="text-gray-600">{selectedAssignment.description}</p>
              </div>

              <div
                className="border-2 border-dashed rounded-lg p-8 text-center mb-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600">
                  اضغط هنا لرفع الملف أو اسحب الملف وأفلته هنا
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleSubmit(selectedAssignment.id, e.target.files)}
                />
              </div>

              {submitProgress > 0 && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${submitProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-2">{submitProgress}%</p>
                </div>
              )}

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => handleSubmit(selectedAssignment.id, [])}
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  تسليم
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AssignmentsPage;