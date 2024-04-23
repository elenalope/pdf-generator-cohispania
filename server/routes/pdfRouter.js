import express from 'express';
import { getAllDocuments } from '../controllers/documents';


const router = express.Router();

router.get('/documents', getAllDocuments);
router.delete();
router.post();
router.put();
router.get();

export default router;