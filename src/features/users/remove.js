import { remove } from './repository';
import resSender from '../common/resSender';

export default (req, res) =>
  remove(req.user.id)
    .then(result => resSender(res, result));
