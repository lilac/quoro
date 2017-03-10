import { update } from './repository';
import resSender from '../common/res-sender';

export default (req, res) =>
  update(req.user.id)
    .then(result => resSender(res, result));
