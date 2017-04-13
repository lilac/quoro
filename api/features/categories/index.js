import { Router } from 'express';
import find from './find';
import findAll from './find-all';

const router = Router();

router.get('', findAll);
router.get('/:id', find);

export default router;
