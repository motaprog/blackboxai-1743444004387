import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';

// Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LessonsPage from './pages/LessonsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import MessagingPage from './pages/MessagingPage';
import EventsPage from './pages/EventsPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Notification />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/messaging" element={<MessagingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;