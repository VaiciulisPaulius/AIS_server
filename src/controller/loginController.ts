import { person } from "../model/person";
import { mysqlDb } from "../mysqlDatabase";
import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
//let jwt = require('jsonwebtoken')
import fsPromises from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import { signedCookie } from "cookie-parser";

class LoginController {
    login = async (req: Request, res: Response) => {
        const username: string = req.query.username as string;
        const password: string = req.query.password as string;

        if(username === undefined || password === undefined) res.send("no login")

        const result: any = await person.authenticate(username, password, mysqlDb);

        if(result != null) {
             const token = jwt.sign(
                 { "payload": result },
                 process.env.ACCESS_TOKEN_SECRET,
                 { expiresIn: '1h' }
             )
             res.send({...result, token});
        }
    }
    validate = async (req: Request, res: Response, next: Function) => {
        const token: string = req.query.token as string;
        if(token === undefined) res.send("no login");

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            console.log(decoded)
            req.query.token = decoded;
            next()
        } catch (error) {
            console.error(error);
            res.send("no login");
        }
    }

}
const loginController: LoginController = new LoginController();
export { loginController };