import { Server } from '../index'
import express from 'express';
import { studentController } from '../controller/studentController';

const router = express.Router();

const dir: string = "/student"

router.get(`${dir}/get/grades`, studentController.getGrades)

export { router }