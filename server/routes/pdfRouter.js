import express from 'express';
import { getAllDocuments, getDocumentById, deleteDocument, createDocument, updateDocument, createAllDocument } from '../controllers/documentController.js';


const router = express.Router();

router.get('/', getAllDocuments);
router.get('/document/:id', getDocumentById);
router.delete('/document/:id', deleteDocument);
router.post('/document', createDocument);
router.put('/document/:id', updateDocument);
router.post('/document',createAllDocument)


export default router;