import { remove } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { id } = req.body;
  return remove(id)
    .then(result => resSender(res, result));
};
