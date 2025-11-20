import Portfolio from '../models/Portfolio.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get portfolio data
export const getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    // If no portfolio exists, create default one
    if (!portfolio) {
      portfolio = await Portfolio.create({
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          email: 'contact@example.com'
        },
        aboutMe: {
          whatDrivesMe: 'Driven by curiosity and a passion for solving real-world problems through technology. I thrive on continuous learning and creating impactful solutions.',
          background: 'A passionate software engineer with expertise in building scalable web applications and innovative solutions. I love turning complex problems into simple, beautiful, and intuitive designs.',
          experience: 'Experienced in developing full-stack applications using modern frameworks and technologies. Strong focus on writing clean, maintainable code and following best practices.'
        },
        skillCategories: [
          { category: 'Frontend', skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'HTML/CSS'] },
          { category: 'Backend', skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL'] },
          { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux'] }
        ],
        projects: [
          {
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB'],
            order: 0
          },
          {
            title: 'Task Management App',
            description: 'Collaborative task management tool with real-time updates and team features.',
            technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
            order: 1
          },
          {
            title: 'AI Chat Application',
            description: 'Real-time chat application powered by AI for intelligent conversations.',
            technologies: ['React', 'Python', 'WebSocket'],
            order: 2
          }
        ]
      });
    }
    
    res.json(portfolio);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update social links
export const updateSocialLinks = async (req, res) => {
  try {
    const { github, linkedin, email } = req.body;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio.socialLinks = { github, linkedin, email };
    await portfolio.save();
    
    res.json({ message: 'Social links updated successfully', portfolio });
  } catch (error) {
    console.error('Update social links error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update about me sections
export const updateAboutMe = async (req, res) => {
  try {
    const { whatDrivesMe, background, experience } = req.body;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio.aboutMe = { whatDrivesMe, background, experience };
    await portfolio.save();
    
    res.json({ message: 'About me updated successfully', portfolio });
  } catch (error) {
    console.error('Update about me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get skill categories
export const getSkillCategories = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json(portfolio.skillCategories);
  } catch (error) {
    console.error('Get skill categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add skill category
export const addSkillCategory = async (req, res) => {
  try {
    const { category, skills } = req.body;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio.skillCategories.push({ category, skills });
    await portfolio.save();
    
    res.json({ message: 'Skill category added successfully', portfolio });
  } catch (error) {
    console.error('Add skill category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update skill category
export const updateSkillCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, skills } = req.body;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const skillCategory = portfolio.skillCategories.id(id);
    if (!skillCategory) {
      return res.status(404).json({ message: 'Skill category not found' });
    }
    
    skillCategory.category = category;
    skillCategory.skills = skills;
    await portfolio.save();
    
    res.json({ message: 'Skill category updated successfully', portfolio });
  } catch (error) {
    console.error('Update skill category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete skill category
export const deleteSkillCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio.skillCategories.pull(id);
    await portfolio.save();
    
    res.json({ message: 'Skill category deleted successfully', portfolio });
  } catch (error) {
    console.error('Delete skill category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get projects
export const getProjects = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    res.json(portfolio.projects.sort((a, b) => a.order - b.order));
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add project
export const addProject = async (req, res) => {
  try {
    const { title, description, technologies, githubUrl, liveUrl } = req.body;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const order = portfolio.projects.length;
    portfolio.projects.push({ title, description, technologies, githubUrl, liveUrl, order });
    await portfolio.save();
    
    res.json({ message: 'Project added successfully', portfolio });
  } catch (error) {
    console.error('Add project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, githubUrl, liveUrl } = req.body;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    const project = portfolio.projects.id(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    project.title = title;
    project.description = description;
    project.technologies = technologies;
    project.githubUrl = githubUrl;
    project.liveUrl = liveUrl;
    await portfolio.save();
    
    res.json({ message: 'Project updated successfully', portfolio });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio.projects.pull(id);
    await portfolio.save();
    
    res.json({ message: 'Project deleted successfully', portfolio });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload CV
export const uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    // Delete old CV if exists
    if (portfolio.cvUrl) {
      const oldCvPath = path.join(__dirname, '../../uploads/', path.basename(portfolio.cvUrl));
      try {
        await fs.unlink(oldCvPath);
      } catch (err) {
        console.log('Old CV file not found or already deleted');
      }
    }
    
    portfolio.cvUrl = `/uploads/${req.file.filename}`;
    await portfolio.save();
    
    res.json({ message: 'CV uploaded successfully', cvUrl: portfolio.cvUrl });
  } catch (error) {
    console.error('Upload CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete CV
export const deleteCV = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    if (portfolio.cvUrl) {
      const cvPath = path.join(__dirname, '../../uploads/', path.basename(portfolio.cvUrl));
      try {
        await fs.unlink(cvPath);
      } catch (err) {
        console.log('CV file not found or already deleted');
      }
    }
    
    portfolio.cvUrl = null;
    await portfolio.save();
    
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Delete CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
