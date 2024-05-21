import express from 'express';
import { addChapter, deleteChapter,getChapters,updateChapter, getChapterById } from '../controllers/chapterController.js';


const router = express.Router();


router.post('/document/:id', addChapter);
router.get('/document/:id', getChapters);
router.get('/document/:id/chapter/:chapterId', getChapterById);
router.delete('/document/:id/chapter/:chapterId', deleteChapter);
router.put('/document/:id/chapter/:chapterId', updateChapter);


export default router;