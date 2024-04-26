import express from 'express';
import { getAllDocuments, getDocById, deleteDocument, createDocument, updateDocument } from '../controllers/documents.js';


const router = express.Router();

router.get('/templates', getAllDocuments);
router.delete('/templates/:_id', deleteDocument);
router.post('/templates', createDocument);
router.put('/templates/:_id', updateDocument);
router.get('/templates/:_id', getDocById);

export default router;