import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { CreateStudentUseCase } from "./useCases/create-student.usecase";
import { PrismaService } from "src/infrastructure/prisma.service";
import { IStudentRepository } from "./repositories/student.repository";
import { StudentPrismaRepository } from "./repositories/prisma/student.prisma.repository";

@Module({
    imports: [],
    controllers: [StudentController],
    providers: [CreateStudentUseCase, PrismaService, {
        provide: IStudentRepository,
        useClass: StudentPrismaRepository
    }],
})
export class StudentModule { }