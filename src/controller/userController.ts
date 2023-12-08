import { student } from "../model/studentModel";
import { mysqlDb } from "../mysqlDatabase";
import { Request, Response } from 'express';
import { personType } from "model/person";

class UserController {
    getHomepage = async (req: Request, res: Response) => {
        const body: object = req.query.token as object;
        const payload: personType = (body as any).payload;

        
    }
}
const userController: UserController = new UserController();
export { userController }