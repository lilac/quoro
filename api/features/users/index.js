import { Router } from 'express';
import create from './create';
import auth from '../common/auth';
import remove from './remove';
import update from './update';
import find from './find';
import findQuestions from './user-questions';

const router = Router();

router.post('/', create);
router.get('/:id/', find);
router.get('/:id/questions/', findQuestions);
router.use(auth);
router.delete('/', remove);
// not ready yet
router.put('/', update);

export default router;
