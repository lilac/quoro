import { find } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { id } = req.params;
  console.log(id);
  return find(id)
    .then(result => resSender(res, result));
};
