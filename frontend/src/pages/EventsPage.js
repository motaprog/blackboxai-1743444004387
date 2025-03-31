import React, { useState } from 'react';

const EventsPage = () => {
  const [selectedView, setSelectedView] = useState('calendar');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock data - In a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: 'Math Competition',
      date: '2024-02-15',
      time: '09:00 AM',
      location: 'School Auditorium',
      type: 'competition',
      description: 'Annual mathematics competition for all grades',
      organizer: 'Mathematics Department',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: '2024-02-20',
      time: '02:00 PM',
      location: 'Main Hall',
      type: 'meeting',
      description: 'Semester progress discussion with parents',
      organizer: 'School Administration',
    },
    {
      id: 3,
      title: 'Science Fair',
      date: '2024-02-25',
      time: '10:00 AM',
      location: 'School Grounds',
      type: 'exhibition',
      description: 'Annual science project exhibition',
      organizer: 'Science Department',
    },
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'competition':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-yellow-100 text-yellow-800';
      case 'exhibition':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate calendar days
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">School Events</h1>
        <p className="text-gray-600">
          Stay updated with all school activities and important dates.
        </p>
      </div>

      {/* View Toggle and Month Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* View Toggle */}
          <div className="flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setSelectedView('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedView === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Calendar View
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                selectedView === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              List View
            </button>
          </div>

          {/* Month Selection */}
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="input"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="input"
            >
              {[2023, 2024, 2025].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {selectedView === 'calendar' && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-gray-50 p-4 text-center font-medium text-gray-600">
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`bg-white p-4 min-h-[120px] ${
                  day ? 'hover:bg-gray-50' : ''
                }`}
              >
                {day && (
                  <>
                    <div className="font-medium text-gray-600 mb-2">{day}</div>
                    {events
                      .filter(event => new Date(event.date).getDate() === day)
                      .map(event => (
                        <div
                          key={event.id}
                          className={`p-2 rounded-lg mb-1 text-xs ${getEventTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))
                    }
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {selectedView === 'list' && (
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Date Box */}
                <div className="flex flex-col items-center justify-center bg-blue-50 rounded-lg p-4 min-w-[100px]">
                  <div className="text-2xl font-bold text-blue-600">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm text-blue-600">
                    {months[new Date(event.date).getMonth()].slice(0, 3)}
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`badge ${getEventTypeColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <i className="fas fa-clock mr-2"></i>
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-user-tie mr-2"></i>
                      {event.organizer}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 min-w-[120px]">
                  <button className="btn btn-primary">
                    <i className="fas fa-calendar-plus mr-2"></i>
                    Add to Calendar
                  </button>
                  <button className="btn btn-secondary">
                    <i className="fas fa-bell mr-2"></i>
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {events.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No events found
              </h3>
              <p className="text-gray-600">
                There are no events scheduled for this period
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsPage;