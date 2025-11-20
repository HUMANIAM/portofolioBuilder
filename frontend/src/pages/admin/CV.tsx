import { useState, useRef, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, UploadCloud, Trash2, Save, FileText, ExternalLink, Download } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

function CV() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentCvUrl, setCurrentCvUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCurrentCV = async () => {
      try {
        const data = await portfolioAPI.getPortfolio();
        if (data.cvUrl) {
          setCurrentCvUrl(data.cvUrl);
        }
      } catch (error) {
        console.error('Error fetching current CV:', error);
      }
    };
    fetchCurrentCV();
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccess('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedFile) {
      setError('Please choose a PDF file first.');
      return;
    }

    setLoading(true);
    try {
      await portfolioAPI.uploadCV(selectedFile);
      setSuccess('CV uploaded successfully.');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to upload CV.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await portfolioAPI.deleteCV();
      setSelectedFile(null);
      setCurrentCvUrl(null);
      setSuccess('CV removed.');
    } catch (err: any) {
      setError(err.message || 'Failed to remove CV.');
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
              CV / Resume
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">Upload CV</label>
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-blue-500/70 transition-colors bg-gray-900/40">
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={onFileChange} 
                />
                <UploadCloud className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-400">Click to upload PDF file</span>
              </label>
              <p className="text-xs text-gray-500">
                Upload your CV/Resume in PDF format. This will be available for download on your portfolio.
              </p>

              <div className="flex gap-3">
                {currentCvUrl && (
                  <a
                    href={`http://localhost:5000${currentCvUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 text-sm"
                  >
                    <Download size={16} />
                    View Current CV
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading || !currentCvUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/40 text-red-300 hover:bg-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  <Trash2 size={16} />
                  Remove CV
                </button>
              </div>
            </div>

            <div className="relative w-full h-64 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              {selectedFile ? (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto mb-2 text-blue-400" />
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              ) : currentCvUrl ? (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto mb-2 text-green-400" />
                    <p className="font-medium">Current CV</p>
                    <p className="text-sm text-gray-500">PDF uploaded</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto mb-2 text-gray-600" />
                    <p>No CV uploaded</p>
                  </div>
                </div>
              )}
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
            disabled={loading || !selectedFile}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
          >
            <Save size={18} />
            {loading ? 'Uploading...' : 'Upload CV'}
          </button>
        </form>
      </main>
    </div>
  );
}

export default CV;
