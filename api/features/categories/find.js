import { find } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { id } = req.params;

  return find(id)
    .then(result => resSender(res, result));
};
