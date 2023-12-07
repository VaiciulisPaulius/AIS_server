import express from 'express';
import { loginController } from '../controller/loginController';

const authenticateRouter = express.Router();

const dir: string = "/authenticate"

authenticateRouter.get(`${dir}/login`, loginController.login)

export { authenticateRouter }