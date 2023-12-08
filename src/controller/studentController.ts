import { student } from "../model/studentModel";
import { mysqlDb } from "../mysqlDatabase";
import { Request, Response } from 'express';
import { personType } from "model/person";

class StudentController {
    getGrades = async (req: Request, res: Response) => {
        const body: object = req.query.token as object;
        const payload: personType = (body as any).payload;
        const subject_id: number = (req.query as any).subject_id;

        //const subjectsResult: any = await student.viewSubjects(payload.id, mysqlDb);

        const result = await student.viewGrades(payload.id, subject_id, true, mysqlDb);
        //console.log(result)
        res.send(result);
    }
    getSubjects = async (req: Request, res: Response) => {
        const body: object = req.query.token as object;
        const payload: personType = (body as any).payload;

        const result = await student.viewSubjects(payload.id, mysqlDb);
        res.send(result)
    }
    getGroup = async (req: Request, res: Response) => {
        const body: object = req.query.token as object;
        const payload: personType = (body as any).payload;

        const result = await student.getGroup(payload.id, mysqlDb);
        res.send(result)
    }
}
const studentController: StudentController = new StudentController();
export { studentController }