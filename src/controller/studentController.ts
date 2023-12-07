import { student } from "../model/studentModel";
import { mysqlDb } from "../mysqlDatabase";
import { Request, Response } from 'express';

class StudentController {
    getGrades = async (req: Request, res: Response) => {
        const result = await student.viewGrades(1, 1, false, mysqlDb);
        res.send(result);
    }
}
const studentController: StudentController = new StudentController();
export { studentController }