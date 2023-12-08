import { Server } from '../index'
import express from 'express';
import { lecturerController } from '../controller/lecturerController';
import { loginController } from '../controller/loginController';

const lecturerRouter = express.Router();

const dir: string = "/lecturer"

lecturerRouter.get(`${dir}/get/subjects`, loginController.validate, lecturerController.getSubjects);
lecturerRouter.get(`${dir}/get/studentsInGroup`, loginController.validate, lecturerController.getStudentsInGroup);
lecturerRouter.get(`${dir}/get/grades`, loginController.validate, lecturerController.getGrades);


export { lecturerRouter }