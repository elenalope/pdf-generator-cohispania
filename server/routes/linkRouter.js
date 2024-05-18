import express from 'express';
import { addLink, deleteLink, updateLink } from '../controllers/linkController.js';

const router = express.Router();

router.post('/document/:id/link', addLink);
router.delete('/document/:id/link/:linkId', deleteLink);
router.put('/document/:id/link/:linkId', updateLink);

export default router;