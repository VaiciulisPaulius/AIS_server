import { Person } from "./person";
import { Database } from "../database";
import { Student } from "./studentModel";

class Lecturer extends Student {
    tableName: String = "Person";

    async viewSubjects(lecturer_id: number, database: Database) {
        if(lecturer_id === undefined || lecturer_id < 0) return;

        let query = `SELECT subjects.id, study_program_group.id as study_program_group_id, subjects.subject, subjects.credits, study_program_group.study_program_group, study_program_group.semester FROM subjects
        JOIN person ON person_id = person.id
        JOIN group_subjects ON group_subjects.subject_id = subject_id
        JOIN study_program_group ON study_program_group.id = group_subjects.study_program_group_id
        WHERE person_id = ${lecturer_id}
        GROUP BY subjects.id, study_program_group.id;`

        let nextResult: any = await database.query(query);

        return nextResult[0];
    }
    
    async getStudentsInGroup(subject_id: number, study_program_id: number, database: Database) {
        if(subject_id === undefined || subject_id < 0) return;
        if(study_program_id === undefined || study_program_id < 0) return;

        let query = `SELECT person.id, role_id, group_id, first_name, last_name, email, group_subjects.subject_id, student_group.group_name FROM person
        JOIN student_group ON student_group.id = person.group_id
        JOIN study_program_group ON study_program_group.id = student_group.id
        JOIN group_subjects ON group_subjects.study_program_group_id = study_program_group.id
        
        WHERE study_program_group.id = ${study_program_id} AND person.role_id = 1 AND group_subjects.subject_id = ${subject_id};`

        let nextResult: any = await database.query(query);

        return nextResult[0];
    }
}
let lecturer: Lecturer = new Lecturer();
export { lecturer };
