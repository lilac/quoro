const populateParams = (params) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach(key => searchParams.append(key, params[key]));
  return searchParams;
};

export const request = (url, method, params) => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  const paramsToString = populateParams(params).toString();
  const link = `${url}?${paramsToString}`;
  return fetch(link, {
    method,
    headers,
  });
};

export const requestWithBody = (url, method, params) => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  const body = populateParams(params);
  return fetch(url, {
    method,
    body,
    headers,
  });
};
