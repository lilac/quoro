import { update } from './repository';
import resSender from '../common/resSender';

export default (req, res) =>
  update(req.user.id)
    .then(result => resSender(res, result));
