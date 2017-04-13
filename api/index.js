import {Server} from "http";
import Express from "express";
import apiRoutes from "./features/index";

const app = Express();
const apiServer = Server(app);

// global.socket = io(apiServer);

app.use('/', apiRoutes);

const port = parseInt(process.env.API_SERVER_PORT, 10) || 8000;

apiServer.listen(port, (err) => {
    if (err) {
        return console.error(err.message);
    }
    return console.info(`Server is running at localhost:${port}`);
});