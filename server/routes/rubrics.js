import express from 'express';
import {
	createRubric,
	getRubrics,
	updateRubric,
	deleteRubric,
} from '../controllers/rubrics.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getRubrics);
router.post('/', auth, createRubric);
router.patch('/:id', auth, updateRubric);
router.delete('/:id', auth, deleteRubric);

export default router;
