import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Portfolio from '../src/models/Portfolio.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const updatePortfolio = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await Portfolio.updateOne({}, {
      $set: {
        'aboutMe.whatDrivesMe': 'What drives me most is taking ownership of my work and applying both technical and interpersonal skills to create meaningful impact. My curiosity for technology, commitment to continuous learning and teamwork skills have enabled me to contribute effectively and adapt quickly across different domains.',
        'aboutMe.background': 'I am a software engineer with experience in lithography (ASML), Automotive (BMW) and Artificial intelligence (RDI-EG)',
        'aboutMe.experience': 'I have worked within various team structures, development methodologies, software architectures and codebases. Collaboration with ML researchers, testers, DevOps engineers, and domain experts. Strong focus on writing clean, maintainable code and following best practices.',
        'socialLinks.linkedin': 'https://www.linkedin.com/feed/'
      }
    });

    console.log('✅ Portfolio updated successfully!');
    console.log('Modified documents:', result.modifiedCount);
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    process.exit(1);
  }
};

updatePortfolio();
