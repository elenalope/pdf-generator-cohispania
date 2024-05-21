import express from 'express';
import { addModule, deleteModule } from '../controllers/moduleController.js';

const router = express.Router();

router.post('/document/:id/module', addModule);
router.delete('/document/:id/module/:moduleId', deleteModule);

export default router;
