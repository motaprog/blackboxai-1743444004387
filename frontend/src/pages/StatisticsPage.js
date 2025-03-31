import React, { useState } from 'react';

const StatisticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data - In a real app, this would come from an API
  const performanceData = {
    overall: 85,
    attendance: 92,
    subjects: [
      { name: 'Mathematics', grade: 88, attendance: 95, assignments: 12, completed: 10 },
      { name: 'Physics', grade: 85, attendance: 90, assignments: 10, completed: 9 },
      { name: 'Chemistry', grade: 82, attendance: 88, assignments: 8, completed: 7 },
      { name: 'English', grade: 90, attendance: 94, assignments: 15, completed: 14 },
    ],
    recentGrades: [
      { subject: 'Mathematics', assignment: 'Quiz 3', grade: 92, date: '2024-02-10' },
      { subject: 'Physics', assignment: 'Lab Report', grade: 85, date: '2024-02-08' },
      { subject: 'English', assignment: 'Essay', grade: 88, date: '2024-02-05' },
    ],
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-600';
    if (progress >= 80) return 'bg-blue-600';
    if (progress >= 70) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Academic Statistics</h1>
        <p className="text-gray-600">
          Track your academic performance and progress across all subjects.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Period Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
              <option value="year">This Year</option>
            </select>
          </div>

          {/* Subject Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input"
            >
              <option value="all">All Subjects</option>
              {performanceData.subjects.map((subject) => (
                <option key={subject.name} value={subject.name.toLowerCase()}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Overall Grade</div>
            <i className="fas fa-chart-line text-blue-600"></i>
          </div>
          <div className={`text-4xl font-bold ${getGradeColor(performanceData.overall)}`}>
            {performanceData.overall}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Attendance Rate</div>
            <i className="fas fa-user-check text-green-600"></i>
          </div>
          <div className="text-4xl font-bold text-green-600">
            {performanceData.attendance}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Total Subjects</div>
            <i className="fas fa-book text-purple-600"></i>
          </div>
          <div className="text-4xl font-bold text-purple-600">
            {performanceData.subjects.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-500">Assignment Completion</div>
            <i className="fas fa-tasks text-yellow-600"></i>
          </div>
          <div className="text-4xl font-bold text-yellow-600">
            {Math.round(
              (performanceData.subjects.reduce((acc, subj) => acc + subj.completed, 0) /
                performanceData.subjects.reduce((acc, subj) => acc + subj.assignments, 0)) *
                100
            )}%
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Subject Performance</h2>
        <div className="space-y-6">
          {performanceData.subjects.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-500">
                    {subject.completed} of {subject.assignments} assignments completed
                  </p>
                </div>
                <div className={`text-xl font-bold ${getGradeColor(subject.grade)}`}>
                  {subject.grade}%
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(subject.grade)} transition-all duration-500`}
                  style={{ width: `${subject.grade}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Grades */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Grades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">Subject</th>
                <th className="text-left py-3 px-4 text-gray-600">Assignment</th>
                <th className="text-left py-3 px-4 text-gray-600">Grade</th>
                <th className="text-left py-3 px-4 text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.recentGrades.map((grade, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">{grade.subject}</td>
                  <td className="py-3 px-4">{grade.assignment}</td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${getGradeColor(grade.grade)}`}>
                      {grade.grade}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{grade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;