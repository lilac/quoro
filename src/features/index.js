import { Router } from 'express';
import usersRouter from './users/index';
import questionsRouter from './questions/index';
import answersRouter from './answers/index';
import authorizate from './users/login';

const router = Router();

router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);
router.post('/authorize', authorizate);

export default router;
