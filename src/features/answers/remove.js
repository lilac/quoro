import { remove } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { id } = req.query;
  return remove(id)
    .then(result => resSender(res, result));
};
