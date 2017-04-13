import { Router } from 'express';
import auth from '../common/auth';
import find from './find';
import create from './create';
import findLast from './find-last';
import findWithQuery from './find-with-query';
import remove from './remove';

const router = Router();

router.get('/last', findLast);
router.get('/query', findWithQuery);
router.get('/:id', find);
router.use('/', auth);
router.delete('/', remove);
router.post('/', create);

export default router;
