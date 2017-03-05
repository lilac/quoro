import { Server } from 'http';
import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './features/index';
import serverRendering from './server-rendering';

const app = Express();
const appServer = Server(app);

app.use('/static', Express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);
app.get('*', serverRendering);

export default appServer;
