import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ExternalLink } from 'lucide-react';
import { authAPI } from '../../services/api';

const MIN_PASSWORD_LENGTH = 6;

function Settings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!formData.newUsername && !formData.newPassword) {
      setError('Provide a new username and/or a new password to make changes.');
      return;
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < MIN_PASSWORD_LENGTH) {
        setError(`Passwords must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match.');
        return;
      }
    }

    setLoading(true);
    try {
      await authAPI.updateCredentials({
        currentPassword: formData.currentPassword,
        newUsername: formData.newUsername || undefined,
        newPassword: formData.newPassword || undefined
      });

      setSuccess('Credentials updated. You will be asked to sign in again.');
      setFormData({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });

      setTimeout(() => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Admin Settings
            </h1>
          </div>
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
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
            >
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 space-y-6">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Current Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
              placeholder="Enter your current password"
              required
              onFocus={resetMessages}
            />
          </div>

          <div className="space-y-4 border-t border-gray-800 pt-6">
            <div>
              <label htmlFor="newUsername" className="block text-sm font-medium text-gray-300 mb-2">
                New Username
              </label>
              <input
                type="text"
                id="newUsername"
                value={formData.newUsername}
                onChange={(e) => setFormData({ ...formData, newUsername: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                placeholder="Leave blank to keep current username"
                onFocus={resetMessages}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="newPassword" className="text-sm font-medium text-gray-300">
                  New Password
                </label>
                <span className="text-xs text-gray-400">
                  Use at least {MIN_PASSWORD_LENGTH} characters — mix letters and numbers for extra safety.
                </span>
              </div>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                placeholder="Leave blank to keep current password"
                onFocus={resetMessages}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                placeholder="Repeat your new password"
                disabled={!formData.newPassword}
                onFocus={resetMessages}
              />
            </div>
          </div>

          {success && (
            <div className="bg-green-500/10 border border-green-500/40 text-green-300 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
          >
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Settings;
