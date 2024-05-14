import express from 'express';
import { addChapter, deleteChapter } from '../controllers/chapterController.js';


const router = express.Router();


router.post('/document/:id/chapter', addChapter);
router.delete('/document/:id/chapter/:chapterId', deleteChapter);



export default router;