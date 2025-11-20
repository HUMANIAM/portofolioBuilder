import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear all users to ensure a clean state
    await User.deleteMany({});
    console.log('�️  Cleared users collection');

    // Create default admin
    const admin = await User.create({
      username: 'admin',
      email: 'admin@portfolio.com',
      password: 'admin123', // Will be hashed by User model pre-save hook
      role: 'admin'
    });

    console.log('✅ Admin user created!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
