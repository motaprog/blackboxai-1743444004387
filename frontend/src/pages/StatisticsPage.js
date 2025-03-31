import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data
  const mockData = {
    grades: {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'الرياضيات',
          data: [85, 88, 82, 90, 85, 88],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: 'العلوم',
          data: [78, 82, 85, 80, 88, 85],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        },
        {
          label: 'اللغة العربية',
          data: [90, 85, 88, 92, 87, 89],
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1,
        },
      ],
    },
    attendance: {
      labels: ['حضور', 'غياب', 'استئذان'],
      datasets: [{
        data: [85, 10, 5],
        backgroundColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
        ],
      }],
    },
    assignments: {
      labels: ['مكتمل', 'متأخر', 'غير مكتمل'],
      datasets: [{
        label: 'حالة الواجبات',
        data: [65, 20, 15],
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
        ],
      }],
    },
    subjectPerformance: {
      labels: ['الرياضيات', 'العلوم', 'اللغة العربية', 'اللغة الإنجليزية', 'الاجتماعيات'],
      datasets: [{
        label: 'معدل الأداء',
        data: [85, 78, 90, 82, 88],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }],
    },
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'تطور الدرجات',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'الأداء حسب المواد',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
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
      className="container mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">الإحصائيات والتقارير</h1>
        
        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">أسبوع</option>
            <option value="month">شهر</option>
            <option value="semester">فصل دراسي</option>
            <option value="year">سنة</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">جميع المواد</option>
            <option value="math">الرياضيات</option>
            <option value="science">العلوم</option>
            <option value="arabic">اللغة العربية</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-500 text-white rounded-lg p-6"
        >
          <div className="text-4xl mb-2">85%</div>
          <div className="text-lg">المعدل العام</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-500 text-white rounded-lg p-6"
        >
          <div className="text-4xl mb-2">95%</div>
          <div className="text-lg">نسبة الحضور</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-yellow-500 text-white rounded-lg p-6"
        >
          <div className="text-4xl mb-2">45</div>
          <div className="text-lg">الواجبات المكتملة</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-purple-500 text-white rounded-lg p-6"
        >
          <div className="text-4xl mb-2">12</div>
          <div className="text-lg">المشاركات</div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Grades Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">تطور الدرجات</h3>
          <Line data={mockData.grades} options={lineOptions} />
        </motion.div>

        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">الأداء حسب المواد</h3>
          <Bar data={mockData.subjectPerformance} options={barOptions} />
        </motion.div>

        {/* Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">نسب الحضور والغياب</h3>
          <div className="w-2/3 mx-auto">
            <Doughnut data={mockData.attendance} options={doughnutOptions} />
          </div>
        </motion.div>

        {/* Assignments Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">حالة الواجبات</h3>
          <div className="w-2/3 mx-auto">
            <Doughnut data={mockData.assignments} options={doughnutOptions} />
          </div>
        </motion.div>
      </div>

      {/* Detailed Stats Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <h3 className="text-xl font-semibold p-6 border-b">تفاصيل الأداء</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">المادة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">المعدل</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">الحضور</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">الواجبات المكتملة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">التقدير</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { subject: 'الرياضيات', average: 85, attendance: 95, completed: 18, grade: 'ممتاز' },
                { subject: 'العلوم', average: 78, attendance: 92, completed: 15, grade: 'جيد جداً' },
                { subject: 'اللغة العربية', average: 90, attendance: 98, completed: 20, grade: 'ممتاز' },
                { subject: 'اللغة الإنجليزية', average: 82, attendance: 94, completed: 16, grade: 'جيد جداً' },
              ].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.average}%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.attendance}%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.completed}/20</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsPage;