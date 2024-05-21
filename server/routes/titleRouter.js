import express from 'express';
import { addTitle, deleteTitle, updateTitle } from '../controllers/titleController.js';

const router = express.Router();

router.post('/document/:id/title', addTitle);
router.delete('/document/:id/title/:titleId', deleteTitle);
router.put('/document/:id/title/:titleId', updateTitle);

export default router;
