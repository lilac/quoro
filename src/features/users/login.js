import { authenticate } from './repository';
import resSender from '../common/resSender';

export default (req, res) => {
  const { login, password } = req.query;
  return authenticate(login, password)
    .then(result => resSender(res, result));
};
