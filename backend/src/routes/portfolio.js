import express from 'express';
import {
  getPortfolio,
  updateSocialLinks,
  updateAboutMe,
  getSkillCategories,
  addSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  uploadCV,
  deleteCV,
  uploadProfileImage,
  deleteProfileImage
} from '../controllers/portfolioController.js';
import { authenticateToken } from '../middleware/auth.js';
import { cvUpload, imageUpload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getPortfolio);
router.get('/skills', getSkillCategories);
router.get('/projects', getProjects);

// Protected routes (admin only)
router.put('/social-links', authenticateToken, updateSocialLinks);
router.put('/about-me', authenticateToken, updateAboutMe);

// Skills CRUD
router.post('/skills', authenticateToken, addSkillCategory);
router.put('/skills/:id', authenticateToken, updateSkillCategory);
router.delete('/skills/:id', authenticateToken, deleteSkillCategory);

// Projects CRUD
router.post('/projects', authenticateToken, addProject);
router.put('/projects/:id', authenticateToken, updateProject);
router.delete('/projects/:id', authenticateToken, deleteProject);

// CV upload
router.post('/cv', authenticateToken, cvUpload.single('cv'), uploadCV);
router.delete('/cv', authenticateToken, deleteCV);

// Profile image upload
router.post('/profile-image', authenticateToken, imageUpload.single('image'), uploadProfileImage);
router.delete('/profile-image', authenticateToken, deleteProfileImage);

export default router;
