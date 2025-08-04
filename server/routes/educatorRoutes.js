import express from 'express'
import upload from '../configs/multer.js'
import {
    addCourse,
    educatorDashboardData,
    getEducatorCourses,
    getEnrolledStudentsData,
    requestEducatorRole
} from '../controllers/educatorController.js'
import { protectEducator } from '../middlewares/authMiddleware.js'

const educatorRouter = express.Router()

// ✅ Request Educator Role (Protected)
educatorRouter.post('/request-role', protectEducator, requestEducatorRole)

// ✅ Add Course (Only for Educators)
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)

// ✅ Get Educator Courses
educatorRouter.get('/courses', protectEducator, getEducatorCourses)

// ✅ Get Educator Dashboard Data
educatorRouter.get('/dashboard', protectEducator, educatorDashboardData)

// ✅ Get Enrolled Students Data
educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData)

export default educatorRouter
