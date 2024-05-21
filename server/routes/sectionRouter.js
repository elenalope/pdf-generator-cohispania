import express from 'express';
import { addSection, deleteSection, updateSection, getSectionById } from '../controllers/sectionController.js';

const router = express.Router();

router.post('/document/:id/section', addSection);
router.delete('/document/:id/section/:sectionId', deleteSection);
router.put('/document/:id/section/:sectionId', updateSection);
router.get('/document/:id/section/:sectionId', getSectionById)

export default router;
