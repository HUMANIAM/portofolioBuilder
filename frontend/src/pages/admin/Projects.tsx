import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, ExternalLink, Edit, Trash2, Github, Globe } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await portfolioAPI.getPortfolio();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
      };

      if (editingId) {
        await portfolioAPI.updateProject(editingId, projectData);
      } else {
        await portfolioAPI.addProject(projectData);
      }
      
      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await portfolioAPI.deleteProject(id);
        await fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
    setEditingId(null);
    setShowAddForm(false);
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
              Projects
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

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        {showAddForm && (
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                  placeholder="My Awesome Project"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white h-24 resize-none"
                  placeholder="Brief description of your project..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                  placeholder="React, TypeScript, Node.js, MongoDB"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                    placeholder="https://myproject.com"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Save size={16} />
                  {editingId ? 'Update' : 'Add'} Project
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-gray-400 mt-1">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-800 rounded text-sm text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-sm transition-colors"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                  >
                    <Globe size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No projects added yet.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Add your first project
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Projects;
