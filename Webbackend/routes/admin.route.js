import express from 'express';
import { login, logout } from '../controllers/admin.controller.js';
import { allPortfolis, deletePortfolis, portfolisAdd } from '../controllers/portfolis.controller.js';
import { jobAdd, allJob, deleteJob } from '../controllers/job.controller.js';
import { sendContactMail } from '../controllers/contact.controller.js';


const router = express.Router();

// Add Admin API
router.post("/admin-login", login)
router.post("/admin-logout", logout)

router.post("/contact-us", sendContactMail)

// Portfolio API 
router.post("/portfolio-add", portfolisAdd)
router.get("/all-portfolio", allPortfolis) 
router.delete('/portfolio-delete/:id', deletePortfolis)

// Job API
router.post("/job-add", jobAdd)
router.get("/all-job", allJob)
router.delete('/job-delete/:id', deleteJob)


export default router;