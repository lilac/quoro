import { authenticate } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { login, password } = req.body;
  return authenticate(login, password)
    .then(result => resSender(res, result));
};
