import server from './server';

const port = parseInt(process.env.SERVER_PORT, 10) || 3000;

server.listen(port, (err) => {
  if (err) {
    return console.error(err.message);
  }
  return console.info(`Server is running at localhost:${port}`);
});
