import express from 'express';
import { addSubsection, deleteSubsection,getSubsectionById } from '../controllers/subsectionController.js';

const router = express.Router();

router.post('/document/:id/chapter/:chapterId/section/:sectionId', addSubsection);
router.delete('/document/:id/chapter/:chapterId/section/:sectionId/subsection/:subsectionId', deleteSubsection);
router.get('/document/:id/section/:sectionId/subsection/:subsectionId', getSubsectionById)
export default router;
