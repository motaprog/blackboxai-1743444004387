import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationContext } from '../App';

const EventsPage = () => {
  const { addNotification } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'list'

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'اجتماع أولياء الأمور',
      description: 'مناقشة نتائج الفصل الدراسي الأول',
      date: '2024-01-20',
      time: '14:00',
      location: 'القاعة الرئيسية',
      type: 'meeting',
      color: 'blue',
    },
    {
      id: 2,
      title: 'امتحان الرياضيات',
      description: 'امتحان نصف الفصل في مادة الرياضيات',
      date: '2024-01-25',
      time: '09:00',
      location: 'قاعة الامتحانات',
      type: 'exam',
      color: 'red',
    },
    {
      id: 3,
      title: 'نشاط رياضي',
      description: 'بطولة كرة القدم المدرسية',
      date: '2024-01-28',
      time: '15:30',
      location: 'الملعب الرياضي',
      type: 'activity',
      color: 'green',
    },
  ]);

  // Event type configurations
  const eventTypes = {
    meeting: { icon: 'fas fa-users', color: 'blue' },
    exam: { icon: 'fas fa-file-alt', color: 'red' },
    activity: { icon: 'fas fa-running', color: 'green' },
    holiday: { icon: 'fas fa-calendar', color: 'purple' },
  };

  useEffect(() => {
    // Simulate loading events
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add previous month's days
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({
        date: day,
        isCurrentMonth: false,
        events: events.filter(event => event.date === day.toISOString().split('T')[0]),
      });
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push({
        date: day,
        isCurrentMonth: true,
        events: events.filter(event => event.date === day.toISOString().split('T')[0]),
      });
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push({
        date: day,
        isCurrentMonth: false,
        events: events.filter(event => event.date === day.toISOString().split('T')[0]),
      });
    }

    return days;
  };

  // Handle event creation/update
  const handleEventSubmit = (eventData) => {
    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      ...eventData,
    };

    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id ? newEvent : event
      ));
      addNotification('تم تحديث الحدث بنجاح', 'success');
    } else {
      // Create new event
      setEvents(prev => [...prev, newEvent]);
      addNotification('تم إنشاء الحدث بنجاح', 'success');
    }

    setShowEventModal(false);
    setSelectedEvent(null);
  };

  // Handle event deletion
  const handleEventDelete = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    addNotification('تم حذف الحدث بنجاح', 'success');
    setShowEventModal(false);
    setSelectedEvent(null);
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">التقويم المدرسي</h1>
          <p className="text-gray-600">
            {currentMonth.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="flex gap-4">
          {/* View Toggle */}
          <div className="flex rounded-lg border overflow-hidden">
            {['month', 'week', 'list'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 ${
                  view === viewType
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`fas fa-${
                  viewType === 'month' ? 'calendar-alt' :
                  viewType === 'week' ? 'calendar-week' : 'list'
                } mr-2`}></i>
                {viewType === 'month' ? 'شهري' :
                 viewType === 'week' ? 'أسبوعي' : 'قائمة'}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              اليوم
            </button>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              className="p-2 rounded-lg border hover:bg-gray-50"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => {
              setSelectedEvent(null);
              setShowEventModal(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            حدث جديد
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 text-center">
          {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
            <div key={day} className="bg-gray-50 py-2 font-semibold">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {generateCalendarDays().map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] bg-white p-2 ${
                !day.isCurrentMonth ? 'text-gray-400' : ''
              } ${
                day.date.toDateString() === new Date().toDateString()
                  ? 'bg-blue-50'
                  : ''
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  {day.date.getDate()}
                </span>
                {day.events.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {day.events.length} أحداث
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {day.events.map(event => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-1 rounded text-xs cursor-pointer bg-${event.color}-100 text-${event.color}-800`}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventModal(true);
                    }}
                  >
                    <i className={`${eventTypes[event.type].icon} mr-1`}></i>
                    {event.title}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && (
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
                <h2 className="text-2xl font-bold">
                  {selectedEvent ? 'تعديل الحدث' : 'حدث جديد'}
                </h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleEventSubmit({
                  title: formData.get('title'),
                  description: formData.get('description'),
                  date: formData.get('date'),
                  time: formData.get('time'),
                  location: formData.get('location'),
                  type: formData.get('type'),
                  color: eventTypes[formData.get('type')].color,
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      عنوان الحدث
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={selectedEvent?.title}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      الوصف
                    </label>
                    <textarea
                      name="description"
                      defaultValue={selectedEvent?.description}
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        التاريخ
                      </label>
                      <input
                        type="date"
                        name="date"
                        defaultValue={selectedEvent?.date}
                        required
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        الوقت
                      </label>
                      <input
                        type="time"
                        name="time"
                        defaultValue={selectedEvent?.time}
                        required
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      المكان
                    </label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={selectedEvent?.location}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      نوع الحدث
                    </label>
                    <select
                      name="type"
                      defaultValue={selectedEvent?.type || 'meeting'}
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="meeting">اجتماع</option>
                      <option value="exam">امتحان</option>
                      <option value="activity">نشاط</option>
                      <option value="holiday">عطلة</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  {selectedEvent && (
                    <button
                      type="button"
                      onClick={() => handleEventDelete(selectedEvent.id)}
                      className="px-6 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      حذف
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    {selectedEvent ? 'تحديث' : 'إنشاء'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventsPage;