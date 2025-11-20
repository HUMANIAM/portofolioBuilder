import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  // Social Links
  socialLinks: {
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    email: { type: String, default: 'contact@example.com' }
  },
  
  // About Me sections
  aboutMe: {
    whatDrivesMe: {
      type: String,
      default: 'Driven by curiosity and a passion for solving real-world problems through technology. I thrive on continuous learning and creating impactful solutions.'
    },
    background: {
      type: String,
      default: 'A passionate software engineer with expertise in building scalable web applications and innovative solutions. I love turning complex problems into simple, beautiful, and intuitive designs.'
    },
    experience: {
      type: String,
      default: 'Experienced in developing full-stack applications using modern frameworks and technologies. Strong focus on writing clean, maintainable code and following best practices.'
    }
  },
  
  // Skills & Technologies
  skillCategories: [{
    category: {
      type: String,
      required: true
    },
    skills: [{
      type: String,
      required: true
    }]
  }],
  
  // Projects
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    technologies: [{
      type: String,
      required: true
    }],
    githubUrl: String,
    liveUrl: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  
  // CV
  cvUrl: {
    type: String,
    default: null
  },

  // Profile Image
  profileImageUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('Portfolio', portfolioSchema);
