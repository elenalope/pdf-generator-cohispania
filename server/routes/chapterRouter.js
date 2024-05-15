import express from 'express';
import { addChapter, deleteChapter,updateChapter } from '../controllers/chapterController.js';


const router = express.Router();


router.post('/document/:id/chapter', addChapter);
router.delete('/document/:id/chapter/:chapterId', deleteChapter);
router.put('/document/:id/chapter/:chapterId', updateChapter);



export default router;