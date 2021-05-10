import express from 'express';
import {
	createFileData,
	getFileData,
	updateFileData,
	deleteFileData,
} from '../controllers/fileData.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFileData);
router.post('/', auth, createFileData);
router.patch('/:id', auth, updateFileData);
router.delete('/:id', auth, deleteFileData);

export default router;
