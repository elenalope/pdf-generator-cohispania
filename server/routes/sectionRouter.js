import express from 'express';
import { addSection, deleteSection, updateSection } from '../controllers/sectionController.js';

const router = express.Router();

router.post('/document/:id/content', addSection);
router.delete('/document/:id/section/:sectionId', deleteSection);
router.put('/document/:id/section/:sectionId', updateSection);

export default router;
