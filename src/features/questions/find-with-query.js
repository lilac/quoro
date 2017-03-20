import { findWithQuery } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { query } = req.query;

  return findWithQuery(query)
    .then(result => resSender(res, result));
};
