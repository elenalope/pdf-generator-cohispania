import express from 'express';
import { addSubsection, deleteSubsection } from '../controllers/subsectionController.js';

const router = express.Router();

router.post('/document/:id/chapter/:chapterId/section/:sectionId/subsection', addSubsection);
router.delete('/document/:id/chapter/:chapterId/section/:sectionId/subsection/:subsectionId', deleteSubsection);

export default router;
