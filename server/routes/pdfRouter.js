import express from 'express';
import { getAllDocuments, getDocById, deleteDocument, createDocument, updateDocument } from '../controllers/documentController.js';


const router = express.Router();

router.get('/', getAllDocuments);
router.get('/document/:id', getDocById);
router.delete('/document/:id', deleteDocument);
router.post('/document', createDocument);
router.put('/document/:id', updateDocument);


export default router;