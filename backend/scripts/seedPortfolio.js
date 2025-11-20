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
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'your.email@example.com'
  },
  aboutMe: {
    whatDrivesMe: 'I am passionate about building software that makes a difference. The intersection of technology and human impact drives my work every day. I believe in writing clean, maintainable code and creating solutions that are both elegant and effective.',
    background: 'With a strong foundation in computer science and years of hands-on experience, I specialize in full-stack development. I have worked on diverse projects ranging from web applications to distributed systems, always focusing on scalability and user experience.',
    experience: 'I have contributed to various successful projects in agile teams, working with modern technologies and frameworks. My experience spans frontend development with React, backend services with Node.js, and databases including MongoDB and PostgreSQL.'
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
