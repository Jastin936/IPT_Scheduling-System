// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  // BRUTE FORCE FULL-SCREEN OVERRIDE
  useEffect(() => {
    const overrideElements = () => {
      const selectors = ['html', 'body', '#root', 'main', '.app-container'];
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.width = '100%';
          el.style.maxWidth = '100%';
          el.style.margin = '0';
          el.style.padding = '0';
          el.style.boxSizing = 'border-box';
        });
      });
    };

    // Run immediately on mount
    overrideElements();
    
    // Run a tiny bit later to catch any delayed layout framework elements
    const timer = setTimeout(overrideElements, 100);
    return () => clearTimeout(timer);
  }, []);

  const appStyles = {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0b0f19',
    backgroundImage: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0b0f19 75%)',
    color: '#f3f4f6',
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0
  };

  const mainAreaStyles = {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0
  };

  return (
    <div style={appStyles} className="app-container">
      <Router>
        <AuthProvider>
          <Navbar />
          <main style={mainAreaStyles}>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Secure Protected Route */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Default fallback route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;