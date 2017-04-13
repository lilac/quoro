import { create } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { content, userId, questionId } = req.body;
  return create(content, userId, questionId)
    .then(result => resSender(res, result));
};
