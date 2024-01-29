import { PrismaService } from "src/infrastructure/prisma.service";
import { FilterStudenDTO, StudenCreatedDTO, CreateStudenDTO, FilterTermDTO } from "../../useCases/dto/student.dto";
import { IStudentRepository } from "../student.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentPrismaRepository implements IStudentRepository {

    constructor(private prisma: PrismaService) { }

    async findAllWithPagination(offset: number, pageSize: number): Promise<StudenCreatedDTO[]> {
        return await this.prisma.student.findMany({
            skip: offset,
            take: pageSize,
            orderBy: {
                createAT: 'desc',
            },
        });
    }

    async findByFiltersWithPagination(filters: FilterTermDTO, offset: number, pageSize: number): Promise<StudenCreatedDTO[]> {

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
