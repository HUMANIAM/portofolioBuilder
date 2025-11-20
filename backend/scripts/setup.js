import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const runScript = async (script, description) => {
  console.log(`\n📦 ${description}...`);
  try {
    const { stdout, stderr } = await execAsync(`node ${script}`);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const setup = async () => {
  console.log('🚀 Setting up Portfolio Application...\n');
  
  await runScript('scripts/createAdmin.js', 'Creating admin user');
  await runScript('scripts/seedPortfolio.js', 'Seeding portfolio data');
  
  console.log('\n✅ Setup complete!');
  console.log('\nNext steps:');
  console.log('1. Start backend: npm run dev');
  console.log('2. Start frontend: cd ../frontend && npm run dev');
  console.log('3. Visit http://localhost:5175');
  console.log('4. Login to admin panel at http://localhost:5175/admin');
  console.log('   Username: admin');
  console.log('   Password: admin123\n');
};

setup();
