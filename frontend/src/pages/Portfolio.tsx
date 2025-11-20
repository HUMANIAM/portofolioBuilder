import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, User, Download, Heart } from 'lucide-react';
import { portfolioAPI } from '../services/api';

interface PortfolioData {
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
  aboutMe: {
    whatDrivesMe: string;
    background: string;
    experience: string;
  };
  skillCategories: Array<{
    _id: string;
    category: string;
    skills: string[];
  }>;
  projects: Array<{
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
  }>;
  cvUrl?: string;
}

function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const portfolioData = await portfolioAPI.getPortfolio();
        setData(portfolioData);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-400">Failed to load portfolio data</div>
      </div>
    );
  }

  const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
                  <User size={24} className="text-blue-400" />
                </div>
              </div>
              <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </a>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Building innovative solutions with modern technologies. Passionate about clean code and user experience.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <a href="#contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Get In Touch
            </a>
            <a href="#projects" className="px-8 py-3 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-colors">
              View Work
            </a>
          </div>
          <div className="flex gap-6 justify-center">
            <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github size={24} />
            </a>
            <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${data.socialLinks.email}`} className="hover:text-blue-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Heart className="text-red-400" />
                What Drives Me
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {data.aboutMe.whatDrivesMe}
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Code2 className="text-blue-400" />
                Background
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {data.aboutMe.background}
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Briefcase className="text-purple-400" />
                Experience
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {data.aboutMe.experience}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.skillCategories.map((group) => (
              <div key={group._id} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <div key={project._id} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group">
                <div className="h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center">
                  <Code2 size={48} className="text-blue-400 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-800 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <ExternalLink size={16} /> Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${data.socialLinks.email}`}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Send Email
            </a>
            {data.cvUrl && (
              <a 
                href={`${API_BASE}${data.cvUrl}`}
                download
                className="px-8 py-4 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Software Engineer Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
