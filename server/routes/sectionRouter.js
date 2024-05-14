import express from 'express';
import { addSection, deleteSection } from '../controllers/sectionController.js';

const router = express.Router();

router.post('/document/:id/section', addSection);
router.delete('/document/:id/section/:sectionId', deleteSection);

export default router;
