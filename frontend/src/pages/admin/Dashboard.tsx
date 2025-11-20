import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Edit, Github, Linkedin, Mail, FileText, Code, Briefcase, Settings, User, ExternalLink } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioData = await portfolioAPI.getPortfolio();
        setData(portfolioData);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        // If unauthorized, redirect to login
        if (error instanceof Error && error.message.includes('token')) {
          localStorage.removeItem('adminToken');
          navigate('/admin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Go Portfolio</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Portfolio Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Social Links Card */}
          <Link
            to="/admin/social-links"
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Social Links</h2>
              <Edit className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Github size={16} />
                <span className="truncate">{data?.socialLinks?.github}</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={16} />
                <span className="truncate">{data?.socialLinks?.linkedin}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="truncate">{data?.socialLinks?.email}</span>
              </div>
            </div>
          </Link>

          {/* About Me Card */}
          <Link
            to="/admin/about-me"
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">About Me</h2>
              <Edit className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
            </div>
            <p className="text-sm text-gray-400 line-clamp-3">
              {data?.aboutMe?.background}
            </p>
          </Link>

          {/* Skills Card */}
          <Link
            to="/admin/skills"
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              <Edit className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Code size={16} />
              <span>{data?.skillCategories?.length || 0} categories</span>
            </div>
          </Link>

          {/* Projects Card */}
          <Link
            to="/admin/projects"
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Projects</h2>
              <Edit className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Briefcase size={16} />
              <span>{data?.projects?.length || 0} projects</span>
            </div>
          </Link>

          {/* CV Card */}
          <Link
            to="/admin/cv"
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">CV / Resume</h2>
              <Edit className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FileText size={16} />
              <span>{data?.cvUrl ? 'Uploaded' : 'Not uploaded'}</span>
            </div>
          </Link>

          {/* Profile Image Card */}
          <Link
            to="/admin/profile-image"
            className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Profile Image</h2>
              <Edit className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <User size={16} />
              <span>{data?.profileImageUrl ? 'Update' : 'Not set'}</span>
            </div>
          </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Settings Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Admin Settings Card */}
            <Link
              to="/admin/settings"
              className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Admin Settings</h2>
                <Edit className="text-gray-500 group-hover:text-blue-400 transition-colors" size={20} />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Settings size={16} />
                <span>Update login credentials</span>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
