import { findLast } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { amount } = req.query;
  return findLast(amount)
    .then(result => resSender(res, result));
};
