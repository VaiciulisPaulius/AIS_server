import { Server } from '../index'
import express from 'express';
import { studentController } from '../controller/studentController';
import { loginController } from '../controller/loginController';

const router = express.Router();

const dir: string = "/student"

router.get(`${dir}/get/grades`, loginController.validate, studentController.getGrades);
router.get(`${dir}/get/subjects`, loginController.validate, studentController.getSubjects);
router.get(`${dir}/get/group`, loginController.validate, studentController.getGroup);

export { router }