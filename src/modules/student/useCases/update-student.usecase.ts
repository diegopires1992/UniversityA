import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IStudentRepository } from "../repositories/student.repository";

@Injectable()
export class UpdateStudentUseCase {

    constructor(private studentRepository: IStudentRepository) { }

    async execute(id: string, data: any) {
        const existingStudent: any = await this.studentRepository.findById(id);

        if (!existingStudent) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }

        if (data.ra || data.cpf) {
            throw new HttpException('RA and CPF cannot be edited', HttpStatus.BAD_REQUEST);
        }

        if (data.ra !== existingStudent.ra) {
            throw new HttpException('RA cannot be edited', HttpStatus.BAD_REQUEST);
        }

        if (data.cpf !== existingStudent.cpf) {
            throw new HttpException('CPF cannot be edited', HttpStatus.BAD_REQUEST);
        }

        if (data.nome) {
            existingStudent.nome = data.nome;
        }

        if (data.email) {
            existingStudent.email = data.email;
        }

        await this.studentRepository.updateById(id, existingStudent);
    }
}
