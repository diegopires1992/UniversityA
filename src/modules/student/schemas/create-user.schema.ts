import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z'

export const isCpfValid = (cpf: string) => {

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf == '') return false;

    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;

    let add: number = 0;

    for (let index: number = 0; index < 9; index++) {
        add += parseInt(cpf.charAt(index)) * (10 - index);
    }

    let rev: number = 11 - (add % 11);

    if (rev == 10 || rev == 11) {
        rev = 0;
    }

    if (rev != parseInt(cpf.charAt(9))) {
        return false;
    }

    add = 0;


    for (let index: number = 0; index < 10; index++) {
        add += parseInt(cpf.charAt(index)) * (11 - index);
    }

    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }

    if (rev != parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}


export const CreateStudentSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email(),
    ra: z.string({
        required_error: "Name is required"
    }),
    cpf: z.string({
        required_error: "CPF is required"
    }).refine((value) => {
        return isCpfValid(value);
    }, {
        message: "Invalid CPF",
    }),
});

export class CreateStudentSchemaDTO extends createZodDto(CreateStudentSchema) { }
