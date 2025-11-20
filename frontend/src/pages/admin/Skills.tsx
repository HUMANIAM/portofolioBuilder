import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { portfolioAPI } from '../../services/api';

function Skills() {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ category: '', skills: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await portfolioAPI.getSkills();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleAdd = async () => {
    try {
      await portfolioAPI.addSkillCategory({
        category: formData.category,
        skills: formData.skills.split(',').map(s => s.trim())
      });
      setFormData({ category: '', skills: '' });
      setShowAddForm(false);
      fetchSkills();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await portfolioAPI.updateSkillCategory(id, {
        category: formData.category,
        skills: formData.skills.split(',').map(s => s.trim())
      });
      setEditingId(null);
      setFormData({ category: '', skills: '' });
      fetchSkills();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      try {
        await portfolioAPI.deleteSkillCategory(id);
        fetchSkills();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const startEdit = (cat: any) => {
    setEditingId(cat._id);
    setFormData({ category: cat.category, skills: cat.skills.join(', ') });
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
              Skills
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
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg outline-none text-white"
                placeholder="Category name (e.g., Frontend)"
              />
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg outline-none text-white"
                placeholder="Skills (comma separated)"
              />
              <div className="flex gap-2">
                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  <Save size={16} />
                </button>
                <button onClick={() => { setShowAddForm(false); setFormData({ category: '', skills: '' }); }} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {categories.map((cat) => (
          <div key={cat._id} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            {editingId === cat._id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg outline-none text-white"
                />
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg outline-none text-white"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(cat._id)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                    <Save size={16} />
                  </button>
                  <button onClick={() => { setEditingId(null); setFormData({ category: '', skills: '' }); }} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{cat.category}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(cat)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(cat._id)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

export default Skills;
