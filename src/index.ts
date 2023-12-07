import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { Person } from './model/person';
import { mysqlDb } from './mysqlDatabase';

import { router } from './routes/student';
import { authenticateRouter } from './routes/authenticate';

//require('dotenv').config()
import dotenv from 'dotenv/config'
console.log(dotenv)

export class Server {
    public static instance: Server;
    private app: express.Application;
    private server: http.Server;
    private port: Number;

    public constructor(port: Number = 8080) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = port;

        this.configureMiddleware();
        this.setupRoutes();

        this.server.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}/`);
        });
    }
    public static getInstance(port?: Number): Server {
        if (!Server.instance) {
            Server.instance = new Server(port);
        }

        return Server.instance;
    }

    private configureMiddleware(): void {
        this.app.use(cors({
            credentials: true
        }));

        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
    }

    private setupRoutes(): void {
        // Define your routes here
        this.app.use("/", router);
        this.app.use("/", authenticateRouter)
    }
}

let server: Server = new Server();
export { server };