import { create } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  const { user, body } = req;
  const { content } = body;
  const { id } = user;

  return create(content, id)
    .then(result => resSender(res, result));
};
