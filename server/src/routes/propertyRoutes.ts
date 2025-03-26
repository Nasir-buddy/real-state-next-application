import express from 'express'
import {
    getProperties,
    getProperty,
    createProperty
} from '../controllers/propertyControllers'
;import { authmiddleware } from '../middleware/authMiddleware';
import multer from 'multer';
const storage = multer.memoryStorage();;
const upload = multer({ storage: storage });
const router = express.Router();

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', authmiddleware["manager"], upload.array("photos"), createProperty);

export default router;