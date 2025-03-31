import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/main.css';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App with StrictMode and Router
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Add event listener for dynamic content loading
document.addEventListener('DOMContentLoaded', () => {
  // Enable smooth scrolling for the entire page
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add class to body when page is loaded
  document.body.classList.add('loaded');
});

// Handle service worker registration for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}