import { remove } from './repository';
import resSender from '../common/res-sender';

export default (req, res) =>
  remove(req.user.id)
    .then(result => resSender(res, result));
