import { findQuestions } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { id } = req.params;
  return findQuestions(id)
    .then(result => resSender(res, result));
};
