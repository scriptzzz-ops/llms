import express from 'express';
import upload from '../configs/multer.js';
import {
  addCourse,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
  requestEducatorRole
} from '../controllers/educatorController.js';
import { protect } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router();

// ✅ Student requests to become educator (protected)
educatorRouter.post('/request-role', protect, requestEducatorRole);

// ✅ Add Courses (only educators)
educatorRouter.post('/add-course', upload.single('image'), protect, addCourse);

// ✅ Get Educator Courses
educatorRouter.get('/courses', protect, getEducatorCourses);

// ✅ Get Educator Dashboard Data
educatorRouter.get('/dashboard', protect, educatorDashboardData);

// ✅ Get Students Enrolled
educatorRouter.get('/enrolled-students', protect, getEnrolledStudentsData);

export default educatorRouter;
