import { lecturer } from "../model/lecturerModel";
import { mysqlDb } from "../mysqlDatabase";
import { Request, Response } from 'express';
import { personType } from "../model/person";

class LecturerController {
    getGrades = async (req: Request, res: Response) => {

        //const subjectsResult: any = await student.viewSubjects(payload.id, mysqlDb);

        const result = await lecturer.viewGrades((req.query as any).student_id, (req.query as any).subject_id, false, mysqlDb);
        console.log(req.query)
        res.send(result);
    }
    getSubjects = async (req: Request, res: Response) => {
        const body: object = req.query.token as object;
        const payload: personType = (body as any).payload;

        const result = await lecturer.viewSubjects(payload.id, mysqlDb);
        res.send(result)
    }
    getStudentsInGroup = async (req: Request, res: Response) => {
        const body: object = req.query.token as object;
        const payload: any = (body as any).payload;

        const result = await lecturer.getStudentsInGroup((req.query as any).subject_id, (req.query as any).study_program_id, mysqlDb);
        console.log(body)
        res.send(result)
    }
}
const lecturerController: LecturerController = new LecturerController();
export { lecturerController }