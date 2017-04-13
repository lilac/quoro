import { findAllCategories } from './repository';
import resSender from '../common/res-sender';

export default (req, res) => {
  return findAllCategories()
    .then(result => resSender(res, result));
};
