const deleteProp = (obj, prop) =>
  Object.keys(obj).reduce((prev, curr) => {
    if (curr !== prop) {
      prev[curr] = obj[curr];
    }
    return prev;
  }, {});

export default (res, data) => {
  const result = deleteProp(data, 'status');
  return res.status(data.status).send(result);
};
