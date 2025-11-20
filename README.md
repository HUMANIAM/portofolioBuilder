# Portfolio with Admin Panel

Portfolio website with admin panel for easy content management.

## Features

### Frontend
- ✨ Modern and clean design
- 🎨 Gradient accents and smooth animations
- 📱 Fully responsive layout
- 🎯 Smooth scroll navigation
- 💼 Sections: Hero, About, Skills, Projects, Contact
- ⚡ Powered by Vite for fast development

### Admin Panel
- 🔐 Secure authentication with JWT
- ✏️ Edit social links (GitHub, LinkedIn, Email)
- 📝 Manage About Me sections (What Drives Me, Background, Experience)
- 🛠️ Full CRUD operations for Skills & Technologies
- 💼 Full CRUD operations for Projects
- 📄 Upload and manage CV/Resume

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

**Start MongoDB locally (if using local MongoDB):**
```bash
# On Linux/Mac
sudo systemctl start mongod
# Or
mongod

```

**Or use MongoDB Atlas (cloud):**
- Create a free cluster at https://www.mongodb.com/atlas
- Get your connection string
- Update `MONGODB_URI` in backend/.env

### Installation

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2. Setup Environment Variables

Create a `.env` file in the `backend` directory (copy from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:5175
```

#### 3. Setup Database and Admin User

Run the setup script (creates admin user and seeds default portfolio data):

```bash
cd backend
node scripts/setup.js
```

**Default credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change these credentials after first login!

#### 4. Start Backend Server

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:5000`

#### 5. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 6. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5175`

### Access the Application

- **Portfolio**: http://localhost:5175
- **Admin Panel**: http://localhost:5175/admin
- **API**: http://localhost:5000/api

## Managing Content

### Using the Admin Panel

1. Navigate to `http://localhost:5175/admin`
2. Login with your credentials
3. Use the dashboard to manage:
   - **Social Links**: Update GitHub, LinkedIn, and Email URLs
   - **About Me**: Edit What Drives Me, Background, and Experience sections
   - **Skills**: Add, edit, or delete skill categories and individual skills
   - **Projects**: Add, edit, or delete projects with technologies, links, etc.
   - **CV**: Upload your resume (PDF, DOC, or DOCX - max 5MB)

### API Endpoints

#### Public Endpoints
- `GET /api/portfolio` - Get all portfolio data
- `GET /api/portfolio/skills` - Get skills
- `GET /api/portfolio/projects` - Get projects

#### Admin Endpoints (Require Authentication)
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token
- `PUT /api/portfolio/social-links` - Update social links
- `PUT /api/portfolio/about-me` - Update about me
- `POST /api/portfolio/skills` - Add skill category
- `PUT /api/portfolio/skills/:id` - Update skill category
- `DELETE /api/portfolio/skills/:id` - Delete skill category
- `POST /api/portfolio/projects` - Add project
- `PUT /api/portfolio/projects/:id` - Update project
- `DELETE /api/portfolio/projects/:id` - Delete project
- `POST /api/portfolio/cv` - Upload CV
- `DELETE /api/portfolio/cv` - Delete CV

## Production Build

### Build Frontend

```bash
cd frontend
npm run build
```

## License

MIT License - feel free to use this template for your own portfolio!
