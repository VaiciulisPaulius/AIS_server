import { Person } from "./person";
import { Database } from "../database";

class Student extends Person {
    tableName: String = "Person";

    async viewGrades(student_id: number, subject_id: number, collapse: boolean, database: Database): Promise<object> {
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

        return await database.query(query)
    }
    async viewSubjects(student_id: number, database: Database) {
        if(student_id === undefined || student_id < 0) return;

        let query = `SELECT subjects.id, subjects.subject, subjects.credits FROM subjects

        JOIN group_subjects ON group_subjects.subject_id = subjects.id
        JOIN study_program_group ON study_program_group.id = group_subjects.study_program_group_id
        JOIN student_group ON study_program_group.id = student_group.study_program_group_id
        JOIN person ON person.group_id = student_group.id
        LEFT JOIN extra_subjects ON extra_subjects.person_id = person.id
        
        WHERE person.id = ${student_id};`

        return await database.query(query);
    }
}
let student: Student = new Student();
export { student };
