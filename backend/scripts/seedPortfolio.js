import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Portfolio from '../src/models/Portfolio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const seedData = {
  socialLinks: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://www.linkedin.com/feed/',
    email: 'your.email@example.com'
  },
  aboutMe: {
    whatDrivesMe: 'What drives me most is taking ownership of my work and applying both technical and interpersonal skills to create meaningful impact. My curiosity for technology, commitment to continuous learning and teamwork skills have enabled me to contribute effectively and adapt quickly across different domains.',
    background: 'I am a software engineer with experience in lithography (ASML), Automotive (BMW) and Artificial intelligence (RDI-EG)',
    experience: 'I have worked within various team structures, development methodologies, software architectures and codebases. Collaboration with ML researchers, testers, DevOps engineers, and domain experts. Strong focus on writing clean, maintainable code and following best practices.'
  },
  skillCategories: [
    {
      category: 'Frontend',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Next.js', 'Vue.js']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL']
    },
    {
      category: 'Database & Tools',
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Git', 'AWS']
    }
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/yourusername/ecommerce',
      liveUrl: ''
    },
    {
      title: 'Task Management App',
      description: 'Real-time collaborative task management with team features and notifications',
      technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/taskapp',
      liveUrl: 'https://taskapp.example.com'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with forecasts, maps, and historical data',
      technologies: ['Vue.js', 'Node.js', 'OpenWeather API', 'Chart.js'],
      githubUrl: 'https://github.com/yourusername/weather',
      liveUrl: ''
    }
  ]
};

const seedPortfolio = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if portfolio data exists
    const existing = await Portfolio.findOne();
    if (existing) {
      console.log('⚠️  Portfolio data already exists. Skipping seed.');
      process.exit(0);
    }

    // Create portfolio data
    await Portfolio.create(seedData);
    console.log('✅ Portfolio data seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding portfolio:', error);
    process.exit(1);
  }
};

seedPortfolio();
