import express from 'express';
import { getAllDocuments, getDocById, deleteDocument, createTemplate, updateDocument } from '../controllers/documents.js';


const router = express.Router();

router.get('/', getAllDocuments);
router.delete('/template/:_id', deleteDocument);
router.post('/template', createTemplate);
router.put('/template/:_id', updateDocument);
router.get('/template/:_id', getDocById);

export default router;