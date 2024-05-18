import express from 'express';
import { addSectionFromChapter, deleteSectionFromChapter, updateSectionFromChapter } from '../controllers/sectionController.js';

const router = express.Router();

router.post('/document/:id/chapter/:chapterId', addSectionFromChapter);
router.delete('/document/:id/chapter/:chapterId/section/:sectionId', deleteSectionFromChapter);
router.put('/document/:id/chapter/:chapterId/section/:sectionId', updateSectionFromChapter);

export default router;
