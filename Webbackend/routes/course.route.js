import express from 'express';
import { allCourse, courseAdd, deleteCourse, getCourseById } from '../controllers/course.controller.js';
import { pageAdd, allPages, deletePage } from '../controllers/coursePage.controller.js';
import {adminSecureRoute} from "../middleware/auth.js"

const router = express.Router();

// Course API
router.get("/all-course", allCourse);
router.get("/course-details/:id", getCourseById);
router.post("/course-add", adminSecureRoute, courseAdd);
router.delete('/course-delete/:id', adminSecureRoute, deleteCourse);

// Course page API 
router.post("/page-add" , pageAdd);
router.get("/all-pages", allPages);
router.delete('/page-delete/:id', deletePage);

export default router;