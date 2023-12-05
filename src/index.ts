import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { PersonModel } from './person';
import { MySqlDatabase } from './mysqlDatabase';

class Server {
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
        this.app.get('/', (req, res) => {
            let personModel = new PersonModel("person");
            let mysql = new MySqlDatabase("localhost", "root", "", "ais");

            personModel.getAll(mysql)
            
            res.send("hello world");
            
        });
    }
}

let server: Server = new Server();