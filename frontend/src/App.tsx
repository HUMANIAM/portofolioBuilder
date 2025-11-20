import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import SocialLinks from './pages/admin/SocialLinks';
import AboutMe from './pages/admin/AboutMe';
import Skills from './pages/admin/Skills';
import Settings from './pages/admin/Settings';
import ProfileImage from './pages/admin/ProfileImage';
import CV from './pages/admin/CV';
import Projects from './pages/admin/Projects';

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
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile-image"
          element={
            <ProtectedRoute>
              <ProfileImage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cv"
          element={
            <ProtectedRoute>
              <CV />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <Projects />
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
