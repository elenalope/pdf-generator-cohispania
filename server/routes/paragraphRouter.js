import express from 'express';
import { addParagraph, deleteParagraph } from '../controllers/moduleController.js';

const router = express.Router();

router.post('/document/:id/chapter/:chapterId/section/:sectionId/paragraph', addParagraph);
router.delete('/document/:id/chapter/:chapterId/section/:sectionId/paragraph/:paragraphId', deleteParagraph);


export default router;
