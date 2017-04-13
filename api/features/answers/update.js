import { update } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { id, content } = req.body;
  return update(id, content)
    .then(result => resSender(res, result));
};
