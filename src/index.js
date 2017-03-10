import server from './server';
import fetch from 'isomorphic-fetch';

const port = parseInt(process.env.SERVER_PORT, 10) || 3000;

server.listen(port, (err) => {
  if (err) {
    return console.error(err.message);
  }
  return console.info(`Server is running at localhost:${port}`);
});
