import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateStudenDTO } from "./dto/student.dto";
import { IStudentRepository } from "../repositories/student.repository";


@Injectable()
export class CreateStudentUseCase {

    constructor(private studentRepository: IStudentRepository) { }

    async execute(data: CreateStudenDTO) {

        const student = await this.studentRepository.findByStudent({
            ra: data.ra
        });


        if (student) {
            throw new HttpException('Student already exists', HttpStatus.BAD_REQUEST);
        }

        return this.studentRepository.save(data);
    }
}