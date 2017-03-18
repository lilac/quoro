import { create } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { user, body } = req;
  const { title, content } = body;
  const { id } = user;

  return create(title, content, id)
    .then(result => resSender(res, result));
};
