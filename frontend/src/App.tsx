import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import SocialLinks from './pages/admin/SocialLinks';
import AboutMe from './pages/admin/AboutMe';
import Skills from './pages/admin/Skills';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('adminToken');
  return token ? <>{children}</> : <Navigate to="/admin" replace />;
}

function AppWithRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/social-links"
          element={
            <ProtectedRoute>
              <SocialLinks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/about-me"
          element={
            <ProtectedRoute>
              <AboutMe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <Skills />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppWithRouter;
