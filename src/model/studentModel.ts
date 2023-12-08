import { Person } from "./person";
import { Database } from "../database";

export class Student extends Person {
    tableName: String = "Person";

    async viewGrades(student_id: number, subject_id: number, collapse: boolean, database: Database): Promise<object> {
        console.log(student_id, subject_id)
        if(student_id === undefined || student_id < 0) return;
        if(student_id === undefined || subject_id < 0) return;

        let query = collapse === true ? `SELECT subject_assignments.id, assignment_types.assignment_type, assignment_types.abbreviation, AVG(grading.grade) AS grade FROM person
        
        JOIN grading ON grading.person_id = person.id
        JOIN subject_assignments ON subject_assignments.id = grading.assignment_id
        JOIN assignment_types ON assignment_types.id = subject_assignments.assignment_type_id

        WHERE person.id = ${student_id} AND subject_assignments.subject_id = ${subject_id}
        GROUP BY assignment_types.id;` :
        
        `SELECT subject_assignments.id, assignment_types.assignment_type, assignment_types.abbreviation, subject_assignments.assignment, grading.grade FROM person
        
        JOIN grading ON grading.person_id = person.id
        JOIN subject_assignments ON subject_assignments.id = grading.assignment_id
        JOIN assignment_types ON assignment_types.id = subject_assignments.assignment_type_id

        WHERE person.id = ${student_id} AND subject_assignments.subject_id = ${subject_id}`;

        const result: any = await database.query(query);

        return await result[0]
    }
    async getGroup(student_id: number, database: Database): Promise<object> {
        if(student_id === undefined || student_id < 0) return;

        let query = `SELECT student_group.id, group_name FROM student_group
        JOIN person ON person.group_id = student_group.id
        WHERE person.id = ${student_id}
        `

        const result: any = await database.query(query);

        return await result[0]
    }
    async viewSubjects(student_id: number, database: Database) {
        if(student_id === undefined || student_id < 0) return;

        let query = `SELECT subjects.id, subjects.subject, subjects.credits, study_program_group.semester FROM subjects

        JOIN group_subjects ON group_subjects.subject_id = subjects.id
        JOIN study_program_group ON study_program_group.id = group_subjects.study_program_group_id
        JOIN student_group ON study_program_group.id = student_group.study_program_group_id
        JOIN person ON person.group_id = student_group.id
        
        WHERE person.id = ${student_id};`

        let result: any = await database.query(query);

        let nextQuery = `SELECT subjects.id, subjects.subject, subjects.credits, extra_subjects.semester, extra_subjects.final_grade FROM subjects

        JOIN extra_subjects ON extra_subjects.subject_id = subjects.id
        WHERE extra_subjects.person_id = ${student_id};`

        let nextResult: any = await database.query(nextQuery);

        return nextResult[0];
    }
}
let student: Student = new Student();
export { student };
