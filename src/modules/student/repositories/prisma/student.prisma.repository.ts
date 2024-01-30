import { PrismaService } from "src/infrastructure/prisma.service";
import { FilterStudenDTO, StudenCreatedDTO, CreateStudenDTO, FilterTermDTO } from "../../useCases/dto/student.dto";
import { IStudentRepository } from "../student.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentPrismaRepository implements IStudentRepository {

    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<CreateStudenDTO | null> {
        return await this.prisma.student.findFirst({
            where: {
                id: id,
                isActive: true
            },
            select: {
                name: true,
                email: true,
                ra: true,
                cpf: true,
            },
        });
    }

    async updateById(id: string, data: Partial<CreateStudenDTO>): Promise<CreateStudenDTO | null> {
        const updatedStudent = await this.prisma.student.update({
            where: {
                ra: id,
                isActive: true
            },
            data: {
                name: data.name,
                email: data.email,
            },
            select: {
                name: true,
                email: true,
                ra: true,
                cpf: true,
            },
        });

        return updatedStudent;
    }


    async deleteById(id: string): Promise<CreateStudenDTO | null> {
        const updatedStudent = await this.prisma.student.update({
            where: {
                ra: id,
                isActive: true
            },
            data: {
                isActive: false,
            },
            select: {
                name: true,
                email: true,
                ra: true,
                cpf: true,
            },
        });

        return updatedStudent;
    }

    async findAllWithPagination(offset: number, pageSize: number): Promise<CreateStudenDTO[]> {
        return await this.prisma.student.findMany({
            skip: offset,
            take: pageSize,
            where: {
                isActive: true,
            },
            orderBy: {
                createAT: 'desc',
            },
            select: {
                name: true,
                email: true,
                ra: true,
                cpf: true,
            },
        });
    }

    async findByFiltersWithPagination(filters: FilterTermDTO, offset: number, pageSize: number): Promise<CreateStudenDTO[]> {

        const searchResult = await this.prisma.student.findMany({
            where: {
                OR: [
                    { name: { contains: filters.term } },
                    { email: { contains: filters.term } },
                    { ra: { contains: filters.term } },
                    { cpf: { contains: filters.term } },
                ],
            },
            skip: offset,
            take: pageSize,
            orderBy: {
                createAT: 'desc',
            },
            select: {
                name: true,
                email: true,
                ra: true,
                cpf: true,
            },
        });

        if (searchResult.length === 0) {
            return await this.prisma.student.findMany({
                skip: offset,
                take: pageSize,
                orderBy: {
                    createAT: 'desc',
                },
            });
        }

        return searchResult;
    }

    async findByStudent(data: FilterStudenDTO): Promise<StudenCreatedDTO | null> {
        return await this.prisma.student.findFirst({
            where: {
                ra: data.ra
            }
        });
    }

    async save(data: CreateStudenDTO): Promise<StudenCreatedDTO> {
        return await this.prisma.student.create({
            data: {
                name: data.name,
                email: data.email,
                ra: data.ra,
                cpf: data.cpf,
            }
        });
    }
}
