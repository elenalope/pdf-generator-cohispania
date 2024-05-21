import express from 'express';
import { addParagraph, deleteParagraph } from '../controllers/paragraphController.js';

const router = express.Router();

router.post('/document/:id/paragraph', addParagraph);
router.delete('/document/:id/chapter/:chapterId/section/:sectionId/paragraph/:paragraphId', deleteParagraph);


export default router;
