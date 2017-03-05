import { create } from './repository';
import resSender from '../common/resSender';

export default (req, res) => {
  const { login, password, username, email } = req.body;
  return create(username, login, password, email)
    .then(result => resSender(res, result));
};
