import { Router } from 'express';
import usersRouter from './users/index';
import questionsRouter from './questions/index';
import answersRouter from './answers/index';

const router = Router();

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);

export default router;
