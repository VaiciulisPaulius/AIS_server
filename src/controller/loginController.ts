import { person } from "../model/person";
import { mysqlDb } from "../mysqlDatabase";
import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
//let jwt = require('jsonwebtoken')
import fsPromises from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'

class LoginController {
    login = async (req: Request, res: Response) => {
        const username: string = req.query.username as string;
        const password: string = req.query.password as string;

        const result: any = await person.authenticate(username, password, mysqlDb);
        
        console.log(process.env.ACCESS_TOKEN_SECRET)

        if(result != null) {
             const token = jwt.sign(
                 { "username": result.username },
                 process.env.ACCESS_TOKEN_SECRET,
                 { expiresIn: '1h' }
             )
             res.send({...result, token});
        }
    }
}
const loginController: LoginController = new LoginController();
export { loginController };