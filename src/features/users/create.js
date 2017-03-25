import { create } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { login, password, username, email, avatar } = req.body;
  console.log(req.body);
  return create(username, login, password, email, avatar)
    .then(result => resSender(res, result));
};
