import { Router } from 'express';
import auth from '../common/auth';
import find from './find';
import create from './create';
import findLast from './find-last';

const router = Router();

router.get('/last', findLast);
router.get('/:id', find);
router.use('/', auth);
router.post('/', create);

export default router;
