import { Router } from 'express';
import create from './create';
import auth from '../common/auth';
import remove from './remove';
import update from './update';
import find from './find';

const router = Router();

router.post('/', create);
router.get('/:id', find);
// router.get('/', login);
router.use(auth);
router.delete('/', remove);
// not ready yet
router.put('/', update);

export default router;
