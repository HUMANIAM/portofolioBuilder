import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

function AboutMe() {
  const navigate = useNavigate();
  const [whatDrivesMe, setWhatDrivesMe] = useState('');
  const [background, setBackground] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await portfolioAPI.getPortfolio();
        setWhatDrivesMe(data.aboutMe.whatDrivesMe);
        setBackground(data.aboutMe.background);
        setExperience(data.aboutMe.experience);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await portfolioAPI.updateAboutMe({ whatDrivesMe, background, experience });
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to update about me');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 space-y-6">
          <div>
            <label htmlFor="whatDrivesMe" className="block text-sm font-medium text-gray-300 mb-2">
              What Drives Me
            </label>
            <textarea
              id="whatDrivesMe"
              value={whatDrivesMe}
              onChange={(e) => setWhatDrivesMe(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white resize-none"
              placeholder="What motivates you as a software engineer?"
              required
            />
          </div>

          <div>
            <label htmlFor="background" className="block text-sm font-medium text-gray-300 mb-2">
              Background
            </label>
            <textarea
              id="background"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white resize-none"
              placeholder="Your background and expertise"
              required
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
              Experience
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white resize-none"
              placeholder="Your professional experience"
              required
            />
          </div>

          {success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
              About me updated successfully!
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default AboutMe;
