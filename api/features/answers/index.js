import { Router } from 'express';
import auth from '../common/auth';
import find from './find';
import create from './create';
import remove from './remove';
import update from './update';

const router = Router();

router.use(auth);
router.get('/:id', find);
router.post('/', create);
router.delete('/', remove);
router.put('/', update);

export default router;
